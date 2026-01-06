import { useCallback, useEffect, useRef, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import Svg from "../components/Svg";
import { useAuth } from "../contexts/AuthContext";
import { FetchProjects } from "../api/FetchProjects";
import formatTime from "../utils/TimeFormat";
import { DeleteProject, ProjectStatus } from "../api/Project";
import { useToast } from "d9-toast";
import useDebounce from "../hooks/useDebounce";
import ProjectForm from "../components/form/ProjectForm";
import { clearSpecificItem } from "../utils/localStorage";
import useConfirmModel from "../hooks/useConfirmModel";

const TOAST_CONFIG = {
  success: {
    type: "success",
    position: "top-right",
    title: false,
    duration: 3000,
    className: "dark:!bg-gray-800 dark:!text-white dark:!border-gray-800",
  },
  error: {
    type: "error",
    position: "top-right",
    duration: 4000,
    className: "dark:!bg-gray-800 dark:!text-white dark:!border-gray-800",
  },
  info: {
    type: "info",
    position: "top-right",
    duration: 3000,
    className: "dark:!bg-gray-800 dark:!text-white dark:!border-gray-800",
  },
};

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [listView, setListView] = useState(false);
  const [disabledProjects, setDisabledProjects] = useState({});
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, searchTerm ? 600 : 0);
  const [projectForm, setProjectForm] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { confirmModel } = useConfirmModel();
  const { sounds, showToast } = useToast();
  const observer = useRef();
  const { user } = useAuth();

  console.log(projects);
  

  // For make project private and public.
  const projectStatus = useCallback(
    async (projectId, status) => {
      try {
        // Disable only the specific project's buttons,,
        setDisabledProjects((prev) => ({ ...prev, [projectId]: true }));

        const result = await ProjectStatus(projectId, status);

        if (result.type === "success") {
          showToast({
            message: result.message,
            ...TOAST_CONFIG.success,
            audio: {
              audioFile: sounds.success,
            },
          });
          // Update the specific project in state immediately...
          setProjects((preProjects) =>
            preProjects.map((project) =>
              projectId === project.id
                ? { ...project, status: status }
                : project
            )
          );

          // Clear only specific user's projects cache.
          if (user.name) {
            const cacheKey = `projects-${user?.name}`;
            clearSpecificItem(cacheKey, projectId, { status: status });
          }
        } else {
          // Handle error case.
          showToast({
            message: result.message || "Failed to update project status",
            ...TOAST_CONFIG.error,
            audio: {
              audioFile: sounds.error,
            },
          });
        }
      } catch (error) {
        console.error("Error updating project status:", error);
        showToast({
          message: "An unexpected error occurred",
          ...TOAST_CONFIG.error,
          audio: {
            audioFile: sounds.error,
          },
        });
      } finally {
        // Re-enable the specific project's buttons.
        setDisabledProjects((prev) => ({ ...prev, [projectId]: false }));
      }
    },
    [user?.name, showToast, sounds.success, sounds.error]
  );

  // For project delete.
  const handleDeleteItem = useCallback(
    async (projectId, pictureID) => {
      try {
        await DeleteProject(projectId, pictureID);
         showToast({
           message: "Project delete successfully.",
           ...TOAST_CONFIG.success,
           audio: {
             audioFile: sounds.success,
           },
         });
        // Remove the specific project in state immediately...
        setProjects((prev) => prev.filter((p) => p.id === pictureID));

      } catch (error) {
        console.error("Error updating project status:", error);
        showToast({
          message: "An unexpected error occurred",
          ...TOAST_CONFIG.error,
          audio: {
            audioFile: sounds.error,
          },
        });
        throw error; // Re-throw so for confirm modal can catch it..
      } finally {
        // Re-enable the specific project's buttons.
        setDisabledProjects((prev) => ({ ...prev, [projectId]: false }));
      }
    },
    [showToast, sounds.error, sounds.success]
  );

  // For fetch all projects.
  const fetchAllProjects = async (
    cursor = null,
    replace = false,
    searchTerm = debouncedSearchTerm
  ) => {
    if (loading || (!hasMore && !replace)) return;

    setLoading(true);

    try {
      const { projects: newProjects, nextCursor: newCursor } =
        await FetchProjects(cursor, 6, searchTerm);

      setProjects((prev) =>
        replace ? newProjects : [...prev, ...newProjects]
      );
      setNextCursor(newCursor);
      setHasMore(Boolean(newCursor));
    } catch (error) {
      console.error("Error fetching projects:", error);
      showToast({
        message: "Failed to fetch projects",
        ...TOAST_CONFIG.error,
        audio: {
          audioFile: sounds.error,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Last project reference.
  const lastProjectRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          nextCursor !== null
        ) {
          fetchAllProjects(nextCursor, false, debouncedSearchTerm);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, nextCursor, debouncedSearchTerm]
  );

  useEffect(() => {
    setProjects([]);
    setNextCursor(null);
    setHasMore(true);
    fetchAllProjects(null, true, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <SidebarLayout>
      {!projectForm ? (
        <div className="relative h-full px-4 md:px-6 w-full max-w-7xl mx-auto">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-lg">Projects</p>
              {/* Project actions */}
              <div className=" flex items-center justify-center gap-2.5">
                <button
                  onClick={() => setEnableSearch(!enableSearch)}
                  aria-label="Project search button"
                  className=" p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Svg name={"packageSearch"} />
                </button>

                <button
                  onClick={() => setProjectForm(true)}
                  aria-label="Project add button"
                  className=" p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Svg name={"packageAdd"} />
                </button>
                <button
                  onClick={() => setListView(!listView)}
                  aria-label="Grid List button"
                  className=" max-sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Svg name={listView ? "grid" : "list"} />
                </button>
              </div>
            </div>
            {/* Search box */}
            <div
              className={`${
                enableSearch ? "flex" : "hidden"
              } sticky top-0 z-10 p-4 justify-center items-center animate-popIn`}
            >
              <div className=" w-full max-w-[300px]  inline-flex justify-between items-center px-2.5 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  className="w-full p-2 outline-0 font-mono"
                  placeholder="Search projects..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <button
                  onClick={() => setSearchTerm("")}
                  aria-label="Search clear button"
                  className=" text-gray-300 dark:text-gray-700 shrink-0 hover:scale-95 active:scale-95 transition-transform cursor-pointer"
                >
                  <Svg name={searchTerm.length > 0 ? "X" : "search"} />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          <ul
            className={`grid gap-6 mt-4 pb-8 ${
              listView
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {projects.length > 0 &&
              projects.map((p, i) => {
                const isLast = i === projects.length - 1 && projects.length > 0;
                const badgeValue = p.badge?.length !== 0 && p.badge[0]?.value;
                const badgeLabel = p.badge?.length !== 0 && p.badge[0]?.label;

                return (
                  <li
                    key={p.id + i}
                    ref={isLast ? lastProjectRef : null}
                    className={`flex ${
                      listView ? "flex-row gap-4 p-4" : "flex-col"
                    } rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow`}
                  >
                    {/* Badge */}
                    <span
                      className={` ${
                        badgeValue === "badge1"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : badgeValue === "badge2"
                          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                          : badgeValue === "badge3"
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                      }  z-10 absolute top-2.5 left-2.5 px-2 py-1 rounded-lg font-medium text-xs backdrop-blur-xs`}
                    >
                      {badgeLabel}
                    </span>
                    {/* Project Image */}
                    <div
                      className={`relative overflow-hidden ${
                        listView ? "w-48 h-32 flex-shrink-0" : "w-full h-48"
                      }`}
                    >
                      <img
                        src={p.picture}
                        alt={`${p.title} project`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div
                      className={` relative flex-1 p-4 ${
                        listView
                          ? "border-l border-gray-200 dark:border-gray-700"
                          : ""
                      }`}
                    >
                      <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                        {p.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-12 line-clamp-3">
                        {listView
                          ? p.description
                          : `${p.description?.substring(0, 100)}...`}
                      </p>

                      {/* Actions */}
                      <div className="absolute bottom-0 right-0 left-0 p-4 flex items-center justify-between bg-gradient-to-t from-white/90 dark:from-gray-800/90 to-transparent rounded-b-md">
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ">
                          <Svg name="calendar" />
                          <span>{formatTime(p.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            disabled={disabledProjects[p.id]}
                            onClick={() =>
                              projectStatus(
                                p.id,
                                p.status === "public" ? "private" : "public"
                              )
                            }
                            aria-label="Private button"
                            className=" disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative group cursor-pointer"
                          >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {p.status === "public"
                                ? "Make Private"
                                : "Make Public"}
                            </span>
                            <Svg
                              name={
                                p.status === "public"
                                  ? "fileUnlock"
                                  : "fileLock"
                              }
                            />
                          </button>

                          <button
                            onClick={() => {
                              setInitialData(p);
                              setProjectForm(true);
                            }}
                            aria-label="Edit button"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group cursor-pointer"
                          >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              Edit
                            </span>
                            <Svg name="edit" />
                          </button>

                          <button
                            onClick={() =>
                              confirmModel("project", p.title, () =>
                                handleDeleteItem(p.id, p.pictureID)
                              )
                            }
                            aria-label="Delete button"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group cursor-pointer"
                          >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              Delete
                            </span>
                            <Svg name="delete" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

            {/* Loading State */}
            {loading && (
              <li className="col-span-full flex justify-center items-center gap-2 py-8">
                <Svg name="loading" className="animate-spin" />
                <span>Loading...</span>
              </li>
            )}

            {/* No More Projects */}
            {!hasMore && projects.length > 0 && (
              <li className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No more projects to load.
              </li>
            )}

            {/* Empty State */}
            {projects.length === 0 && !loading && (
              <li className="col-span-full text-center py-16">
                <div className="text-gray-400 dark:text-gray-500">
                  <Svg
                    name="empty"
                    size={64}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p className="text-lg">No projects found</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <ProjectForm
          close={() => setProjectForm(false)}
          initialData={initialData}
          setInitialData={setInitialData}
        />
      )}
    </SidebarLayout>
  );
};

export default ProjectPage;
