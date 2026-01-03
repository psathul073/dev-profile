import { useToast } from "d9-toast";
import Svg from "./Svg";
import { Link, useNavigate } from "react-router";
import { useCallback } from "react";

const ShareLink = ({ shareUrl, setShareLinkModel, userData }) => {
  const encodedURL = encodeURIComponent(shareUrl);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCopy =  useCallback( () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() =>
          showToast({
            message: "Link copied to clipboard!",
            duration: 3000,
            className: "dark:!bg-gray-800 dark:!text-white !border-gray-800",
          })
        )
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  },[showToast, shareUrl]);

  const fallbackCopy = () => {
    const input = document.createElement("input");
    input.value = shareUrl;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showToast({
        message: "Link copied (fallback)!",
        duration: 3000,
        className: "dark:!bg-gray-800 dark:!text-white !border-gray-800",
      });
    } catch (err) {
      showToast({
        message: `Failed to copy ${err}`,
        type: "error",
        duration: 4000,
        className: "dark:!bg-gray-800 dark:!text-white !border-gray-800",
      });
    }
    document.body.removeChild(input);
  };

  return (
    <div className="z-20 fixed top-0 h-full w-full flex justify-center items-center p-2.5 overflow-hidden">
      <div className="profile-share w-full max-w-[425px] p-3 content-center text-center  rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 animate-popIn ">
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <h1 className=" font-medium ">Share Dev profile</h1>
          <button
            className="p-1.5 text-sm rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-red-800/10 hover:text-red-800 transition cursor-pointer"
            onClick={() => setShareLinkModel(false)}
          >
            <Svg name={"X"} />
          </button>
        </div>

        <div className=" flex flex-col justify-center items-center ">
          <div className="url-box w-44 h-40 flex flex-col items-center justify-center rounded-xl bg-indigo-50/5 backdrop-blur-xs shadow mb-4 cursor-pointer hover:-translate-y-4 duration-200">
            <img
              className=" w-20 h-20 rounded-full border border-indigo-400 dark:border-indigo-600 p-0.5 "
              src={userData?.avatar ?? "/avatar.webp"}
              alt="avatar"
              height={80}
              width={80}
              loading="lazy"
              fetchPriority="high"
            />
            <p className=" flex flex-row items-center justify-center gap-1.5 my-0.5 text-[15px] ">
              @{userData?.name}{" "}
              {userData?.verified && (
                <Svg name={"badgeCheck"} className="text-blue-500" />
              )}
            </p>
            <p className="text-xs">/{userData?.name}</p>
          </div>

          <div className="share-links w-full flex justify-evenly items-center">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-indigo-800/10 hover:text-indigo-800 transition cursor-pointer"
            >
              <Svg name={"copy"} />
            </button>
            <Link
              to={`https://wa.me/?text=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-green-800/10 hover:text-green-800 transition cursor-pointer"
            >
              <Svg name={"wa"} />
            </Link>
            <Link
              to={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-rose-800/10 hover:text-rose-800 transition cursor-pointer"
            >
              <Svg name={"ig"} />
            </Link>
            <Link
              to={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-blue-800/10 hover:text-blue-800 transition cursor-pointer"
            >
              <Svg name={"fb"} />
            </Link>
            <Link
              to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-blue-800/10 hover:text-blue-800 transition cursor-pointer"
            >
              <Svg name={"lk"} />
            </Link>
            <Link
              to={`https://twitter.com/intent/tweet?url=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-zinc-900/30 hover:text-zinc-700 transition cursor-pointer"
            >
              <Svg name={"x"} />
            </Link>
          </div>
        </div>

        <p className="my-4 text-sm ">Register your Dev Profile</p>

        <button
          onClick={() => navigate("/landing")}
          className="w-8/12 px-3 py-2 mb-4 rounded-3xl text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 cursor-pointer "
        >
          Register
        </button>

        <p className=" text-center text-xs">
          Made with ❤️ by d9.coder {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ShareLink;
