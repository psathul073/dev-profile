import { useCallback, useEffect, useState } from "react";
import { FetchCounts } from "../api/FetchProjects";
import { useAuth } from "../contexts/AuthContext";
import SidebarLayout from "../layout/SidebarLayout";
import Svg from "../components/Svg";
import { useToast } from "d9-toast";
import { profileUpdates } from "../api/Profile";
import { useNavigate } from "react-router";
import useFileUpload from "../hooks/useFileUpload";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState({});
  const { file, fileURL, fileInputRef, handleFileChange } = useFileUpload();
  const { showToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // For edit mode handle.
  const enableEditMode = useCallback(() => {
    if (!editMode) {
      showToast({
        message: "Edit mode is on",
        type: "success",
        title: false,
        position: "center-top",
        duration: 3000,
        className: "dark:!bg-gray-800 dark:!text-white",
      });
      setEditMode(true);
    } else {
      showToast({
        message: "Edit mode is off",
        type: "error",
        title: false,
        position: "center-top",
        duration: 3000,
        className: "dark:!bg-gray-800 dark:!text-white",
      });
      setEditMode(false);
    }
  }, [showToast, editMode]);

  // Handle submit.
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData(e.target);

        if (file) formData.set("avatar", file);

        if (formData.get("name") !== user?.name) {
          localStorage.removeItem(`projects-${user?.name}`);
          localStorage.removeItem(`cursor-${user?.name}`);
        }

        localStorage.removeItem(`user-${user?.name}`);

        // const data = Object.fromEntries(formData);
        // console.log(Object.keys(data)); // Array of form field names
        // console.log(data); // Object with all form values

        // Update profile
        const response = await profileUpdates(formData);

        if (!response?.type) {
          showToast({
            message: response?.message,
            type: "error",
            duration: 3000,
            className: "dark:!bg-gray-800 dark:!text-white",
          });
        } else {
          showToast({
            message: response?.message,
            type: "success",
            duration: 3000,
            className: "dark:!bg-gray-800 dark:!text-white",
          });
          setTimeout(() => navigate(0), 2000);
        }
      } catch (error) {
        showToast({
          message: "Profile update error.",
          type: "error",
          duration: 3000,
          className: "dark:!bg-gray-800 dark:!text-white",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [user.name, file, navigate, showToast]
  );

  // To get total projects and likes count.
  const fetchCounts = async () => {
    try {
      const result = await FetchCounts();
      setCount(result);
    } catch (error) {
      console.error("Fetching count error:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <SidebarLayout>
      <div className="relative h-full px-4 md:px-6 w-full max-w-7xl mx-auto text-gray-700 dark:text-gray-300 ">
        {/* Head section */}
        <div className="w-full ">
          <div className=" flex items-center justify-between mt-2 ">
            <h2 className="text-lg ">Profile</h2>
            <button
              aria-label="User Edit"
              onClick={enableEditMode}
              className=" p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Svg name={"userEdit"} />
            </button>
          </div>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 rounded-2xl p-2.5">
            <div className="relative p-2 flex flex-col justify-center items-center rounded-full group transform duration-200">
              <img
                src={
                  fileURL
                    ? fileURL
                    : user?.avatar
                    ? `${user.avatar}?w=256&q=80&f=auto`
                    : "/avatar.png"
                }
                alt="avatar"
                height={128}
                width={128}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="w-32 h-32 border
              border-indigo-200 p-1 rounded-full"
              />
              <label
                htmlFor="avatar"
                className={`${
                  !editMode && "hidden"
                } invisible absolute h-32 w-32 rounded-full flex justify-center items-center text-2xl text-shadow-white cursor-pointer bg-transparent backdrop-blur-xs group-hover:visible group-active:visible`}
              >
                <Svg name={"camera"} className={"text-white"} />
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/webp, image/jpeg"
                ref={fileInputRef}
                disabled={!editMode}
                onChange={handleFileChange}
                hidden
              />
            </div>

            <div className="space-y-1 text-center text-[17px]">
              <p className="text-indigo-500 font-semibold">@{user?.name}</p>
              <p className=" inline-flex items-center justify-center gap-2 text-sm text-slate-600 ">
                <Svg name={"mail"} />
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-row max-sm:flex-col justify-center items-center mb-4 gap-5 space-x-1 my-2">
            <div className=" w-fit flex flex-row justify-center items-center gap-2 bg-rose-400/10 text-rose-400 px-3 py-1.5 rounded-full text-[15px] ">
              <Svg name={"favorite"} />
              <span>Likes : {count?.totalLikes || "0"}</span>
            </div>
            <div className="w-fit flex flex-row justify-center items-center gap-2 bg-orange-400/10 text-orange-400 px-3 py-1.5 rounded-full text-[15px]">
              <Svg name={"folder"} />
              <span>Projects : {count?.totalProject || "0"}</span>
            </div>
          </div>
        </div>

        {/* Edit options */}
        <>
          <p className="text-lg mb-4">Links </p>
          <form
            onSubmit={handleSubmit}
            className=" grid grid-cols-2 max-sm:grid-cols-1 gap-5"
          >
            <div className="flex flex-row items-center gap-2 text-[17px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"user"}></Svg>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Username"
                className=" w-full outline-0"
                defaultValue={user?.name || "Dev"}
                disabled={!editMode}
                required
              />
            </div>

            <div className="flex flex-row items-center gap-2 text-[17px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"ig"}></Svg>
              <input
                type="url"
                name="ig"
                id="ig"
                placeholder="Instagram URL"
                className=" w-full outline-0"
                defaultValue={user?.links.ig}
                disabled={!editMode}
              />
            </div>

            <div className="flex flex-row items-center gap-2 text-[17px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"gh"}></Svg>
              <input
                type="url"
                name="gh"
                id="gh"
                placeholder="Github URL"
                className=" w-full outline-0"
                defaultValue={user?.links.gh}
                disabled={!editMode}
                required
              />
            </div>

            <div className="flex flex-row items-center gap-2 text-[16px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"lk"}></Svg>
              <input
                type="url"
                name="lk"
                id="lk"
                placeholder="Linkedin URL"
                className=" w-full outline-0"
                defaultValue={user?.links.lk}
                disabled={!editMode}
                required
              />
            </div>

            <div className="flex flex-row items-center gap-2 text-[17px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"yt"}></Svg>
              <input
                type="url"
                name="yt"
                id="yt"
                placeholder="Youtube URL"
                className=" w-full outline-0"
                defaultValue={user?.links.yt}
                disabled={!editMode}
              />
            </div>

            <div className="flex flex-row items-center gap-2 text-[16px] p-3 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30">
              <Svg className={"inline-block"} name={"x"}></Svg>
              <input
                type="url"
                name="x"
                id="x"
                placeholder="X URL"
                className=" w-full outline-0"
                defaultValue={user?.links.x}
                disabled={!editMode}
              />
            </div>
            {/* action */}
            <div className=" max-sm:col-span-1 col-span-2 flex items-center justify-end ">
              <button
                disabled={loading}
                type="submit"
                aria-label="Upload button"
                className={`${
                  editMode ? "inline-flex" : "hidden"
                } items-center justify-center gap-2 w-80 p-2.5 rounded-lg text-white font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
              >
                <Svg name={loading ? "loading" : "upload"} />
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </>
      </div>
    </SidebarLayout>
  );
};

export default ProfilePage;
