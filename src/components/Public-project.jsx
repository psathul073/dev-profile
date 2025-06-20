import React, { useEffect, useState } from 'react';
import Svg from './Svg';
import { FetchProjectForPublic } from '../api/FetchProjects';
import { db, auth, ref, signInAnonymously, get, onValue, runTransaction } from '../config/firebase';

const PublicProject = ({ projectID, username, setIsShowHome }) => {

  const [project, setProject] = useState({});
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  // Create a project like node.
  const projectLikeRef = ref(db, `projects/${projectID}`);

  // To update the like count in real time listener.
  const likeUpdate = async () => {

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
      };

    } catch (error) {
      console.error("Auth error", error);
    };
    // Add current like count.
    onValue(projectLikeRef, (snapshot) => {

      const projectData = snapshot.val() || { totalLikes: 0 };
      setCount(projectData.totalLikes || 0);
    });
  };

  useEffect(() => {
    likeUpdate();
  }, []);

  // Handle like.
  const handleLikeClick = () => {

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
      };

      // Update the total likes and increment if user is not liked.
      const newData = {
        ...currentData,
        totalLikes: (currentData.totalLikes || 0) + 1,
        userLikes: {
          ...(currentData.users || {}),
          [user.uid]: true,
        },
      };
      // Update the database
      return newData;

    })
      .then(() => {
        setIsDisable(true);
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
      });

  };

  // Fetch a single project.
  const FetchProject = async () => {
    try {
      const result = await FetchProjectForPublic(username, projectID);
      // console.log(result, '==project');
      setProject({ ...result });
    } catch (error) {
      console.error('Project fetching error,', error);
    }

  };

  useEffect(() => {
    FetchProject();
  }, []);

  return (

    <div className='overlay h-full w-full flex items-center justify-center scroll-smooth'>

      <div className=" relative h-fit w-4xl p-2 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl ">

        <div className=' relative flex flex-col md:flex-row gap-4'>
          <div onClick={() => setIsShowHome(true)} className='absolute top-2 right-2 md:hidden p-0.5 text-lg rounded-full border border-indigo-400/5 text-red-400/50 bg-indigo-200 animate-pulse cursor-pointer'><Svg name={'X'} /> </div>
          <img className=' w-full md:w-80 h-80 object-scale-down rounded-md p-1 inset-shadow-[0_0_5px_2px_rgb(129,140,248,0.2)] ' src={project?.picture ? project?.picture : "/addImg.webp"} alt="project img" loading='lazy' />

          <div className='w-full flex flex-col gap-2 p-2 rounded-md inset-shadow-[0_0_5px_2px_rgb(129,140,248,0.2)]'>

            <div className='header flex flex-row justify-between items-center'>
              <h1 className='font-bold text-[1.08em] text-indigo-950/50'>{project?.title}</h1>
              <div onClick={() => setIsShowHome(true)} className=' hidden md:block  p-0.5 text-lg rounded-full border border-indigo-400/5 text-red-400/50 bg-indigo-200 animate-pulse cursor-pointer'><Svg name={'X'} /> </div>
            </div>

            <p className='text-indigo-950/45'>{project?.description}</p>

            <div className='h-full flex justify-center p-2'>

              <div className='self-end w-full flex justify-evenly items-center border-t border-indigo-950/10 py-1 text-[1.1em] '>
                <button onClick={() => handleLikeClick()} disabled={isDisable} className='flex items-center justify-center gap-1 text-rose-400 cursor-pointer'><Svg name={isDisable ? 'liked' : 'like'} className={'text-[1.2em]'} />{count}</button>
                <button onClick={() => window.open(project?.demoURL, "_blank")} className='flex items-center justify-center gap-1 text-indigo-400 cursor-pointer'><Svg name={'project'} className={'text-[1.2em]'} />code</button>
                <button onClick={() => window.open(project?.liveURL, "_blank")} className='flex items-center justify-center gap-1 text-amber-500 cursor-pointer'><Svg name={'demo'} className={'text-[1.2em]'} />live</button>
              </div>

            </div>


          </div>

        </div>

      </div>

    </div>

  )
}

export default PublicProject