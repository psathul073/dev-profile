import React, { useCallback, useEffect, useRef, useState } from "react";
import Svg from "./Svg";
import { FetchProjectsForPublic } from "../api/FetchProjects";
import ShareLink from "./Share-link";
import { getWithExpiry, setWithExpiry } from "../utils/localStorage.js";
import { FetchProfileForPublic } from "../api/Profile.js";
import { useToast } from "d9-toast";
import PublicHomeSkeleton from "./Skeleton/PublicHomeSkeleton.jsx";

const TOAST_CONFIG = {
  success: {
    type: "success",
    duration: 3000,
    className: "dark:!bg-gray-800 dark:!text-white",
  },
  error: {
    type: "error",
    duration: 4000,
    className: "dark:!bg-gray-800 dark:!text-white",
  },
  info: {
    type: "info",
    duration: 3000,
    className: "dark:!bg-gray-800 dark:!text-white",
  },
};

function PublicHome({ setIsShowHome, username, setProjectID }) {
  const [userData, setUserData] = useState(null);
  const [userDataFetching, setUserDataFetching] = useState(false);
  const [projects, setProjects] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [shareLinkModel, setShareLinkModel] = useState(false);
  const [showInfo, setShowInfo] = useState(
    () => localStorage.getItem("infoPopup") || "show"
  );
  const { showToast, removeToast } = useToast();
  const observer = useRef();

  const FetchAllProjects = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const { projects: newProjects, nextCursor: newCursor } =
      await FetchProjectsForPublic(username, nextCursor);
    const updatedProjects = [...projects, ...newProjects];

    setProjects(updatedProjects);
    setNextCursor(newCursor);
    setHasMore(Boolean(newCursor));
    setLoading(false);
    // Cache projects in locally.
    setWithExpiry(`projects-${username}`, updatedProjects);
    setWithExpiry(`cursor-${username}`, newCursor);
  }, [hasMore, nextCursor, loading, projects, username]);

  // Last project reference.
  const lastProjectRef = useCallback(
    (node) => {
      // console.log('called');

      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          FetchAllProjects();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const FetchUser = useCallback(async () => {
    setUserDataFetching(true);
    try {
      const result = await FetchProfileForPublic(username);
      if (result) {
        setUserData(result);
        setWithExpiry(`user-${username}`, result);
      }
    } catch (error) {
      showToast({
        message: error?.message || "Something went wrong, Profile fetch error.",
        ...TOAST_CONFIG.error,
      });
    } finally {
      setUserDataFetching(false);
    }
  }, [showToast, username]);

  // For caching...
  useEffect(() => {
    const storedProjects = getWithExpiry(`projects-${username}`);
    const storedCursor = getWithExpiry(`cursor-${username}`);
    const storedUser = getWithExpiry(`user-${username}`);

    if (storedProjects) {
      setProjects(storedProjects);
      setNextCursor(storedCursor);
      setHasMore(Boolean(storedCursor));
    } else {
      FetchAllProjects();
    }

    if (storedUser) {
      setUserData(storedUser);
    } else {
      FetchUser();
    }
  }, [username]);

  useEffect(() => {
    if (showInfo === "show") {
      showToast({
        type: "info",
        message: `Note : Our backend is currently hosted on a free plan. When inactive for about 10 minutes, the server goes into sleep
        mode. The first request after this may take 20–30 seconds while the
        server wakes up.`,
        autoClose: false,
        className:
          " dark:!bg-gray-950 dark:!text-gray-200 border border-gray-200 dark:border-gray-900 ",
        actions: [
          {
            text: "Hide",
            callback: ({ id }) => {
              setShowInfo("hide");
              localStorage.setItem("infoPopup", "hide");
              removeToast(id);
            },
          },
          {
            text: "Dismiss",
            callback: ({ id }) => {
              removeToast(id);
            },
          },
        ],
      });
    }
  }, [showToast, removeToast, showInfo]);

  return (
    <>
      {userDataFetching ? (
        <PublicHomeSkeleton />
      ) : (
        <div className=" relative w-full max-w-[500px] h-full flex flex-col gap-2.5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 shadow-2xs">
          {/* Header */}
          <button
            onClick={() => setShareLinkModel(true)}
            className=" absolute top-1 right-1 z-20 p-2  rounded-full hover:bg-gray-100 dark:hover:bg-gray-800  transition cursor-pointer"
          >
            <Svg name={"share"} />
          </button>

          {/* User details */}
          <div className="relative flex flex-col items-center justify-center p-2.5">
            <img
              className="relative w-33 h-33 my-4 z-10 p-1 shrink-0 object-contain bg-center rounded-full border border-dashed border-gray-300 dark:border-gray-800 "
              src={
                userDataFetching
                  ? "/avatar.webp"
                  : userData?.avatar
                  ? userData?.avatar
                  : "/avatar.webp"
              }
              alt="avatar"
              loading="lazy"
              width={132}
              height={132}
              fetchPriority="high"
            />

            <p className=" shrink-0 flex flex-row items-center justify-center gap-1.5 mb-4 text-[1.1em] ">
              @{userData?.name}
              {userData?.verified && (
                <Svg name={"badgeCheck"} className="text-blue-500" />
              )}
            </p>

            <div className="w-full h-full flex flex-row items-center justify-center overflow-x-scroll gap-10 ">
              {userData !== null &&
                userData?.links &&
                Object?.keys(userData?.links).map((key) => {
                  if (!userData.links[key] == "") {
                    return (
                      <div
                        onClick={() =>
                          window.open(userData?.links[key], "_blank")
                        }
                        key={key}
                        className="p-2 text-lg hover:text-indigo-500 dark:hover:text-indigo-400 hover:scale-105 transition cursor-pointer"
                      >
                        <Svg name={key} />
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          {/* Projects */}
          <div className=" h-full flex flex-col gap-5 p-2.5 overflow-y-scroll">
            {projects &&
              projects.map((project, index) => {
                const isLast = index === projects?.length - 1;
                return (
                  <button
                    key={project.id}
                    ref={isLast ? lastProjectRef : null}
                    onClick={() => {
                      setIsShowHome(false);
                      setProjectID(project.id);
                    }}
                    className=" relative flex flex-row items-center gap-1.5 text-sm font-medium p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <Svg name={"codeFolder"} /> {project?.title}
                  </button>
                );
              })}
            {loading && (
              <p className=" w-full inline-flex justify-center items-center gap-1">
                <Svg name={"loading"} /> Loading...
              </p>
            )}
            {!hasMore && (
              <p className="w-full inline-flex justify-center items-center gap-2 text-sm ">
                <Svg name={"codeFolder"} />
                No more projects.
              </p>
            )}
          </div>
        </div>
      )}

      {shareLinkModel && (
        <ShareLink
          setShareLinkModel={setShareLinkModel}
          shareUrl={import.meta.env.VITE_FRONTEND_URL + `/u/${userData?.name}`}
          userData={userData}
        />
      )}
    </>
  );
}

export default PublicHome;
