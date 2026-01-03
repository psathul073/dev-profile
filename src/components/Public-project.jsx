import React, { memo, useCallback, useEffect, useState } from "react";
import Svg from "./Svg";
import { FetchProjectForPublic } from "../api/FetchProjects";
import {
  db,
  auth,
  ref,
  signInAnonymously,
  get,
  onValue,
  runTransaction,
} from "../config/firebase";
import { useToast } from "d9-toast";
import PublicProjectSkeleton from "./Skeleton/PublicProjectSkeleton";

const PublicProject = ({ projectID, username, setIsShowHome }) => {
  const [project, setProject] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isResized, setIsResized] = useState(false);
  const { showToast } = useToast();

  // Create a project like node.
  const projectLikeRef = ref(db, `projects/${projectID}`);

  // To update the like count in real time listener.
  const likeUpdate = useCallback(async () => {
    try {
      // Handle authentication.
      const res = await signInAnonymously(auth);
      const uid = res?.user.uid;
      setUser(res?.user);
      // Check if user has already liked this project.
      const userLikeRef = ref(db, `projects/${projectID}/userLikes/${uid}`);
      const snapshot = await get(userLikeRef);
      // console.log(snapshot.exists());
      // User is already liked.
      if (snapshot.exists()) {
        // Disable like button.
        setIsDisable(true);
      }
    } catch (error) {
      console.error("Auth error", error);
    }
    // Add current like count.
    onValue(projectLikeRef, (snapshot) => {
      const projectData = snapshot.val() || { totalLikes: 0 };
      setCount(projectData.totalLikes || 0);
    });
  }, [projectID, projectLikeRef]);

  useEffect(() => {
    likeUpdate();
  }, []);

  // Handle like.
  const handleLikeClick = useCallback(() => {
    if (!user || isDisable) return;

    // Create structure of update data..
    const updates = {};
    updates[`projects/${projectID}/userLikes/${user.uid}`] = true;

    // Add likes and like counts.
    runTransaction(projectLikeRef, (currentData) => {
      // There is no data exists.
      if (!currentData) {
        // return current project like reference
        return {
          totalLikes: 1,
          userLikes: {
            [user.uid]: true,
          },
        };
      }

      // If already liked, just return same data.
      if (currentData.userLikes?.[user.uid]) {
        return currentData;
      }

      // Update the total likes and increment if user is not liked.
      return {
        ...currentData,
        totalLikes: (currentData.totalLikes || 0) + 1,
        userLikes: {
          ...(currentData.userLikes || {}),
          [user.uid]: true,
        },
      };
    })
      .then(() => {
        showToast({
          message: "Thanks for your support 🥳",
          className: "dark:!bg-gray-800 dark:!text-white !border-gray-800",
          title: false,
          duration: 3000,
        });
        setIsDisable(true);
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
      });
  }, [isDisable, user, projectLikeRef, projectID, showToast]);

  // Fetch a single project.
  const FetchProject = useCallback(async () => {
    try {
      setIsFetching(true);
      const result = await FetchProjectForPublic(username, projectID);
      setProject({ ...result });
    } catch (error) {
      console.error("Project fetching error,", error);
    } finally {
      setIsFetching(false);
    }
  }, [projectID, username]);

  useEffect(() => {
    FetchProject();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center overflow-y-scroll">
      {/* Public project section */}
      {isFetching ? (
        <PublicProjectSkeleton />
      ) : (
        <div className=" relative h-fit w-full max-md:max-w-lg max-w-[768px] p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 animate-popIn">
          <div className=" relative h-full flex flex-col md:flex-row justify-between max-md:items-center gap-3 group ">
            <button
              onClick={() => setIsShowHome(true)}
              className="absolute top-0 right-0 md:hidden p-1.5 text-sm rounded-full border border-indigo-200/10 hover:bg-red-800/10 hover:text-red-800 transition cursor-pointer"
            >
              <Svg name={"X"} />
            </button>

            {/* Image section */}
            <img
              onClick={() => setIsResized(!isResized)}
              className={`w-80 h-80 shrink-0 object-center p-2 rounded-lg cursor-s-resize ${
                isResized ? "object-contain" : "object-cover"
              }`}
              src={project?.picture ? project?.picture : "/addImg.webp"}
              alt="project img"
              height={320}
              width={320}
              loading="lazy"
              fetchPriority="high"
            />
            {/* Details section */}
            <div className=" w-full max-h-full flex flex-col justify-between rounded-md  ">
              <div>
                {/* Header */}
                <div className=" w-full inline-flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-lg ">{project?.title}</h2>
                  <button
                    onClick={() => setIsShowHome(true)}
                    className=" hidden md:block p-1 text-sm rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-red-800/10 hover:text-red-800 opacity-0  group-hover:opacity-100 group-active:opacity-100 transition cursor-pointer"
                  >
                    <Svg name={"X"} />
                  </button>
                </div>
                {/* Description */}
                <p className=" text-sm mb-3">{project?.description}</p>

                {/* Tags */}
                <ul className=" flex flex-row items-center flex-wrap gap-1.5 my-4 ">
                  {project.usedTec &&
                    project.usedTec.map((obj, idx) => (
                      <li
                        key={obj.value || idx}
                        className=" bg-indigo-100 text-xs dark:text-indigo-950 font-medium px-2 py-0.5 pb-1 rounded-md"
                      >
                        {obj?.label}
                      </li>
                    ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="w-full flex justify-evenly items-center my-3">
                <button
                  aria-label="Like Button"
                  onClick={() => handleLikeClick()}
                  disabled={isDisable}
                  className="flex items-center justify-center gap-1 py-1 px-3 rounded-full bg-red-100 text-rose-400 hover:bg-rose-200 transition-colors cursor-pointer"
                >
                  <Svg name={isDisable ? "happy" : "unhappy"} />
                  {count}
                </button>
                <button
                  onClick={() => window.open(project?.demoURL, "_blank")}
                  className="flex items-center justify-center gap-1 py-1 px-3 rounded-full bg-indigo-100 text-indigo-400 hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  <Svg name={"documentCode"} />
                  code
                </button>
                <button
                  onClick={() => window.open(project?.liveURL, "_blank")}
                  className="flex items-center justify-center gap-1 py-1 px-3 rounded-full bg-orange-100 text-orange-400 hover:bg-orange-200 transition-colors cursor-pointer"
                >
                  <Svg name={"internet"} />
                  live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PublicProject);
