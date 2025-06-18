
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Svg from '../components/Svg';
import { FetchProjects } from '../api/FetchProjects';
import ProjectEdit from '../components/Project-edit';
import ProjectDelete from '../components/Project-delete';

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [projectID, setProjectID] = useState(null);
  const [pictureID, setPictureId] = useState(null);
  const navigate = useNavigate();
  const observer = useRef();

  const fetchAllProjects = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const { projects: newProjects, nextCursor: newCursor } = await FetchProjects(nextCursor);

    setProjects((prev) => [...prev, ...newProjects]);
    setNextCursor(newCursor);
    setHasMore(Boolean(newCursor));
    setLoading(false);

  };

  // Last project reference.
  const lastProjectRef = useCallback((node) => {
    // console.log('called');

    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchAllProjects();
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <>
      <div className='bg-white h-screen w-screen flex justify-center p-2.5  bg-[url(/bg2.webp)] bg-cover font-nanum text-2xl overflow-hidden'>

        <div className=' px-4 py-5 w-full sm:w-7/12  bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl overflow-hidden '>

          <div className='header px-1.5 mb-2 flex justify-between items-center '>
            <h2 className=' bg-amber-200 px-2 py-0.5 text-lg text-amber-800 font-semibold rounded-md' >Projects</h2>
            <div onClick={() => navigate('/')} className='text-2xl text-amber-800 rounded-full p-1 bg-amber-200 cursor-pointer'>
              <Svg name={'X'} />
            </div>

          </div>

          <div className='project-container h-full pb-5 text-center overflow-auto scroll-smooth scrollbar'>

            {
              projects.map((project, index) => {
                const isLast = index === projects.length - 1;
                return (
                  <div key={project.id} ref={isLast ? lastProjectRef : null} className='project flex flex-row items-center gap-2 my-5 py-3 px-2 border border-amber-300/50 bg-transparent backdrop-blur-xs shadow-md rounded-md'>

                    <img className='w-10 h-10 mx-2 rounded-md object-center object-contain' src={project.picture ? project.picture : "/addImg.webp"} alt="project-photo" loading='lazy' />

                    <div className='w-full flex md:flex-row flex-col justify-between text-amber-800'>
                      <h2 className='text-left'> {project.title}</h2>
                      <div className='flex justify-end items-center gap-4 mr-1.5'>
                        <button onClick={() => { setDeleteModel(true), setProjectID(project.id), setPictureId(project.pictureID) }} className='flex items-center justify-center gap-1.5 px-2 text-red-400 cursor-pointer hover:text-red-600 active:text-red-600 transition-colors duration-200 group'> Delete <Svg name={'delete'} className={'group-hover:animate-bounce group-active:animate-bounce'} /> </button>
                        <button onClick={() => { setEditModel(true), setProjectID(project.id)}} className='flex items-center justify-center gap-1.5 px-2 text-green-600 cursor-pointer  hover:text-green-400 active:green-red-400 transition-colors duration-200 group'> Edit <Svg name={'edit'} className={'group-hover:animate-pulse group-active:animate-pulse'} /></button>
                      </div>
                    </div>

                  </div>
                );
              })
            }

            {loading && <p className='text-amber-500 animate-pulse'>Loading...</p>}
            {!hasMore && <p className="text-amber-400 pb-5">No more projects.</p>}

          </div>

        </div>

      </div>

     { editModel && <ProjectEdit setEditModel={setEditModel} projectID={projectID} />}
      {deleteModel && <ProjectDelete setDeleteModel={setDeleteModel} projectID={projectID} pictureID={pictureID} />}

    </>

  )
}

export default Projects