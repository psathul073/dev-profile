import React, { useCallback, useRef } from "react";
import Svg from "../Svg";
import { useState } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import { FetchRepo } from "../../api/FetchRepo";
import { useToast } from "d9-toast";
import MultiSelect from "../MultiSelect";
import { UpdateProject, UploadProject } from "../../api/Project";
import { useNavigate } from "react-router";
import { clearSpecificItem } from "../../utils/localStorage";
import { useAuth } from "../../contexts/AuthContext";

const TOAST_CONFIG = {
  success: {
    type: "success",
    position: "top-right",
    title: false,
    duration: 3000,
    className: "dark:!bg-gray-800 dark:!text-white",
  },
  error: {
    type: "error",
    position: "top-right",
    duration: 4000,
    className: "dark:!bg-gray-800 dark:!text-white",
  },
};

const ProjectForm = ({ initialData = null, setInitialData, close }) => {
  const [fetchMode, setFetchMode] = useState(false);
  const [repoData, setRepoData] = useState({
    title: "",
    description: "",
    liveURL: "",
    demoURL: "",
  });
  const [repoFetching, setRepoFetching] = useState(false);
  const {
    file,
    fileURL,
    fileName,
    fileInputRef,
    handleFileChange,
    removeFile,
  } = useFileUpload();
  const [selected, setSelected] = useState(initialData?.usedTec || []);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const fetchFormRef = useRef(null);
  const mainFormRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Clear function
  const handleClear = useCallback(() => {
    fetchFormRef.current?.reset();
    mainFormRef.current?.reset();

    setRepoData({
      title: "",
      description: "",
      liveURL: "",
      demoURL: "",
    });
    setSelected([]);
    removeFile();
  }, [removeFile]);

  // Handle go back.
  const handleBack = useCallback(() => {
    setInitialData(null);
    handleClear();
    close();
  }, [handleClear, close, setInitialData]);

  // Fetch github repos and add to form.
  const handleRepoFetching = useCallback(
    async (e) => {
      e.preventDefault();
      setRepoFetching(true);
      try {
        // Prevent duplicate fetch...
        if (Object.values(repoData).every((value) => value !== "")) return;

        const repoFormData = new FormData(e.target);
        const data = Object.fromEntries(repoFormData);

        const result = await FetchRepo(data);
        if (result?.status === "404") {
          showToast({
            message: result?.message,
            ...TOAST_CONFIG.error,
          });
          setRepoFetching(false);
          return;
        }
        setRepoData({
          title: result?.name ?? null,
          description: result?.description ?? null,
          liveURL: result?.homepage ?? null,
          demoURL: result?.html_url ?? null,
        });
      } catch (error) {
        console.error("Error fetching repo:", error);
        showToast({
          message: "Repositories Not Found.",
          ...TOAST_CONFIG.error,
        });
      } finally {
        fetchFormRef.current?.reset();
        setRepoFetching(false);
      }
    },
    [repoData, showToast]
  );

  // For submit project data.
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitting(true);
      const newFormData = new FormData(e.target);

      if (initialData) {
        if (!file) newFormData.delete("picture");
        if (initialData.pictureID)
          newFormData.set("pictureID", initialData?.pictureID);
        if (selected.length > 0)
          newFormData.set("usedTec", JSON.stringify(selected));
        newFormData.set("projectID", initialData?.id);
        newFormData.set("status", initialData?.status);
        try {
          const updateResult = await UpdateProject(newFormData);

          showToast({
            type: updateResult?.type || "success",
            title: false,
            message: updateResult?.message || "Something wrong!",
            duration: 3000,
            className: "dark:!bg-gray-800 dark:!text-white",
          });
          // Clear data...
          if (updateResult?.type === "success") {
            // Clear only specific user's projects cache.
            const cacheKey = `projects-${user?.name}`;
            clearSpecificItem(cacheKey, initialData?.id, updateResult?.newData);

            setTimeout(() => navigate(0), 2000);
          }
        } catch (error) {
          console.error("Error Submitting project:", error);
          showToast({
            message: "Project add failed.",
            ...TOAST_CONFIG.error,
          });
        } finally {
          handleClear();
          setSubmitting(file);
        }
      } else {
        try {
          if (selected.length > 0 && file) {
            newFormData.set("picture", file);
            newFormData.set("usedTec", JSON.stringify(selected));
            const result = await UploadProject(newFormData);

            showToast({
              type: result?.type || "success",
              title: false,
              message: result?.message || "Something wrong!",
              duration: 3000,
              className: "dark:!bg-gray-800 dark:!text-white",
            });
            // Clear data...
            if (result?.type === "success") {
              setTimeout(() => {
                handleClear();
                navigate(0);
              }, 2000);
            }
          } else {
            showToast({
              message: "Fill in the missing fields...",
              title: false,
              ...TOAST_CONFIG.error,
            });
            return;
          }
        } catch (error) {
          console.error("Error Submitting project:", error);
          showToast({
            message: "Project add failed.",
            ...TOAST_CONFIG.error,
          });
          handleClear();
        } finally {
          setSubmitting(false);
        }
      }
    },
    [initialData, user.name, selected, file, handleClear, navigate, showToast]
  );

  return (
    <div className="absolute inset-0 h-full px-4 md:px-6 w-full max-w-7xl mx-auto ">
      {/* Head section */}
      <div className=" flex justify-between items-center my-2.5 mb-4">
        <button
          aria-label="Go Back Button"
          className=" inline-flex justify-between items-center gap-2 text-lg transition-[gap] duration-500 hover:gap-0.5 cursor-pointer"
          onClick={handleBack}
        >
          <Svg name={"arrowLeft"} /> back
        </button>
        <button
          onClick={() => setFetchMode((fetchMode) => !fetchMode)}
          aria-label="Github Search Button"
          className=" relative p-1.5 rounded-lg hover:dark:bg-gray-900 hover:bg-gray-100 group cursor-pointer"
        >
          <Svg name={"packageSearch"} />
          <p className=" absolute top-1/2 -translate-y-1/2 right-11 bg-gray-800 text-white text-xs/4 py-1  px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ">
            Fetch project
          </p>
        </button>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        {/* Github project fetch */}
        <form
          ref={fetchFormRef}
          onSubmit={handleRepoFetching}
          className={`${
            fetchMode && !initialData ? "flex" : "hidden"
          }  flex-wrap justify-center gap-5 mb-8 animate-popIn`}
        >
          <div className=" w-full">
            <input
              className=" w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
              type="text"
              name="ghUsername"
              id="ghUsername"
              placeholder="Github username"
              required
            />
          </div>

          <div className=" w-full">
            <input
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
              type="text"
              name="repoName"
              id="repoName"
              placeholder="Project name"
              required
            />
          </div>
          <div className=" w-full flex items-center justify-end-safe">
            <button
              disabled={repoFetching}
              aria-label="Project Fetch Button"
              className=" bg-indigo-500 text-white p-2.5 w-full max-w-96 rounded-lg flex justify-center items-center gap-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              type="submit"
            >
              <Svg name={repoFetching ? "loading" : "fileDownload"} />
              {repoFetching ? "Fetching..." : "Fetch"}
            </button>
          </div>
        </form>

        {/* Project details */}
        <>
          <form
            ref={mainFormRef}
            onSubmit={handleSubmit}
            className=" grid grid-cols-2 max-sm:grid-cols-1 gap-8"
          >
            <div className=" col-span-2">
              <input
                className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
                type="text"
                placeholder="Project title"
                maxLength={"22"}
                id="title"
                name="title"
                defaultValue={
                  initialData ? initialData?.title : repoData?.title
                }
                required
              />
            </div>
            <div className="col-span-2">
              <textarea
                className="w-full h-28 p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
                type="text"
                name="description"
                id="description"
                placeholder="Small description"
                maxLength="260"
                defaultValue={
                  initialData ? initialData?.description : repoData?.description
                }
                required
              />
            </div>

            {/* Select container*/}
            <div className="col-span-2">
              <MultiSelect selected={selected} setSelected={setSelected} />
            </div>

            <div className="max-sm:col-span-2">
              <input
                className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
                type="url"
                name="liveURL"
                id="liveURL"
                placeholder="Live URL"
                defaultValue={
                  initialData ? initialData?.liveURL : repoData?.liveURL
                }
                required
              />
            </div>
            <div className="max-sm:col-span-2">
              <input
                className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30 "
                type="url"
                name="demoURL"
                id="demoURL"
                placeholder="Demo URL"
                defaultValue={
                  initialData ? initialData?.demoURL : repoData?.demoURL
                }
                required
              />
            </div>

            {/* Image section */}
            <div className=" col-span-2 flex justify-center items-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-2.5 backdrop-blur-2xl">
              <input
                type="file"
                name="picture"
                id="picture"
                accept="image/png, image/webp, image/jpeg"
                width={700}
                height={200}
                ref={fileInputRef}
                onChange={handleFileChange}
                defaultValue={file}
                hidden
              />
              {file || initialData ? (
                <img
                  src={file ? fileURL : initialData?.picture}
                  width={600}
                  height={600}
                  alt={fileName}
                  className=" shrink-0 rounded-md "
                />
              ) : (
                <>
                  <Svg name={"upload"} />
                  <label htmlFor="picture" className=" cursor-pointer">
                    Browse Files to upload
                  </label>
                </>
              )}
            </div>

            <div className=" col-span-2 flex justify-between items-center gap-2 p-3 rounded-lg bg-gray-50/60 dark:bg-gray-800/50 border border-gray-400/20 ">
              <label htmlFor="picture">
                <Svg name={"image"} />
              </label>

              <div className=" w-full text-right overflow-scroll ">
                <p className="max-sm:text-sm">{fileName.slice(fileName)} -</p>
              </div>

              <button
                className=" pl-1 shrink-0 hover:text-red-500 cursor-pointer"
                aria-label="File Delete Button"
                type="button"
                onClick={removeFile}
              >
                <Svg name={"delete"} />
              </button>
            </div>
            {/* Action */}
            <div className="col-span-2 flex justify-end items-center mb-6 ">
              <button
                disabled={submitting}
                type="submit"
                aria-label="Project Upload Button"
                className="bg-emerald-500 text-white p-2.5 w-80 rounded-lg flex justify-center items-center gap-2 font-semibold hover:bg-emerald-600 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <Svg name={submitting ? "loading" : "upload"} />
                {initialData
                  ? `${submitting ? "Updating..." : "Update"}`
                  : `${submitting ? "Uploading..." : "Upload"}`}
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default ProjectForm;
