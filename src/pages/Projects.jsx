
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FetchProjects } from '../api/FetchProjects';
import ProjectEdit from '../components/Project-edit';
import { Edit, Eye, EyeOff, Trash2, X } from 'lucide-react';
import { DeleteProject, ProjectToPrivate, ProjectToPublic } from '../api/Project';
import ConfirmModel from '../components/Confirm-model';
import { useAuth } from '../contexts/AuthContext';

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [projectID, setProjectID] = useState(null);
  const [pictureID, setPictureId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();
  const { user } = useAuth();

  // Fetch all projects.
  const fetchAllProjects = async (cursor = null, replace = false) => {
    if (loading || (!hasMore && !replace)) return;

    setLoading(true);

    const { projects: newProjects, nextCursor: newCursor } = await FetchProjects(cursor, 20);

    setProjects((prev) =>
      replace ? newProjects : [...prev, ...newProjects]
    );

    setNextCursor(newCursor);
    setHasMore(Boolean(newCursor));
    setLoading(false);
  };

  // Project make to public.
  const projectToPublic = async (projectID) => {
    setDisabled(true);
    await ProjectToPublic(projectID);
    setDisabled(false);
    // Full refresh from the start.
    fetchAllProjects(null, true);
    // Remove cached public projects.
    localStorage.removeItem(`projects-${user?.name}`);
  };

  // Project make to private.
  const projectToPrivate = async (projectID) => {
    setDisabled(true);
    await ProjectToPrivate(projectID);
    setDisabled(false);
    // Full refresh from the start.
    fetchAllProjects(null, true);
    // Remove cached public projects.
    localStorage.removeItem(`projects-${user?.name}`);
  };

  // Last project reference.
  const lastProjectRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && nextCursor !== null) {
          fetchAllProjects(nextCursor);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, nextCursor]
  );

  // Delete project.
  const deleteProject = async () => {
    setDisabled(true);
    await DeleteProject(projectID, pictureID);
    setDisabled(false);

    // UI update.
    setProjects((prev) => prev.filter((p) => p.id !== projectID));
    // Full refresh from the start.
    fetchAllProjects(null, true);
    // Remove cached public projects.
    localStorage.removeItem(`projects-${user?.name}`);
    // Close model.
    setDeleteModel(false);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <>
      <div className='z-20 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex justify-center p-2.5  overflow-hidden'>

        <div className=' p-4 w-full max-w-[768px] bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins overflow-hidden animate-popIn '>

          <div className='header px-1.5 mb-2 flex justify-between items-center '>
            <h2 className=' text-lg font-medium' >Projects</h2>
            <div onClick={() => navigate('/')} className='rounded-full p-1.5 bg-indigo-200/10 hover:bg-indigo-200/20  cursor-pointer'>
              <X />
            </div>

          </div>

          <div className='project-container h-full pb-5 text-center overflow-auto scroll-smooth scrollbar'>

            {
              projects && projects.map((project, index) => {

                const isLast = index === projects.length - 1 && projects.length > 0;

                return (
                  <div key={project.id || index} ref={isLast ? lastProjectRef : null} className='project flex flex-row items-center justify-between gap-2 my-5 mx-2 py-3 px-2 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>

                    <img className='w-10 h-10 mx-2 rounded-md object-center object-contain' src={project.picture ? project.picture : "/addImg.webp"} alt="project-photo" loading='lazy' />

                    <div className='w-full flex flex-row max-[425px]:flex-col items-center max-[425px]:items-end max-sm:text-sm overflow-hidden'>

                      <h2 className='text-left w-full'> {project.title}</h2>

                      <div className=' w-fit flex justify-end items-center gap-4 mr-1.5'>
                        <button disabled={disabled} onClick={() => { setDeleteModel(true), setProjectID(project.id), setPictureId(project.pictureID); setProjectName(project.title) }} className='flex items-center justify-center gap-1.5 p-2 bg-red-800/10 rounded-full text-red-800 hover:bg-red-800/20 active:bg-red-800/20 cursor-pointer transition-colors duration-200 '> <Trash2 /> </button>
                        <button onClick={() => { setEditModel(true), setProjectID(project.id) }} className='flex items-center justify-center gap-1.5 p-2 rounded-full bg-green-800/10 text-green-700 hover:bg-green-800/20 active:bg-green-700/20 cursor-pointer transition-colors duration-200'> <Edit /> </button>
                        <button disabled={disabled} onClick={() => { project.public ? projectToPrivate(project.id) : projectToPublic(project.id) }} className='flex items-center justify-center gap-1.5 p-2 rounded-full bg-blue-800/10 text-blue-700 hover:bg-blue-800/20 active:bg-blue-700/20 cursor-pointer transition-colors duration-200'>{project.public ? <Eye /> : <EyeOff />}</button>
                      </div>

                    </div>

                  </div>
                );
              })
            }

            {loading && <p className='text-red-400 animate-pulse'>Loading...</p>}
            {!hasMore && <p className="dark:text-green-400 text-green-600 pb-5">No more projects.</p>}

          </div>

        </div>

      </div>

      {editModel && <ProjectEdit setEditModel={setEditModel} projectID={projectID} />}

      {deleteModel && <ConfirmModel title={"Delete Project"} content={`Are you sure, do you want delete '${projectName}' ?`} cancel={() => setDeleteModel(false)} confirm={() => deleteProject()} loading={disabled} />}

    </>

  )
}

export default Projects