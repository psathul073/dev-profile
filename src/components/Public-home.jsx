import React, { useCallback, useEffect, useRef, useState } from 'react';
import Svg from './Svg';
import { FetchProfileForPublic, FetchProjectsForPublic } from '../api/FetchProjects';
import ShareLink from './Share-link';

function PublicHome({ setIsShowHome, username, setProjectID }) {

    const [userData, setUserData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [shareLinkModel, setShareLinkModel] = useState(false);
    const observer = useRef();

    const FetchAllProjects = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const { projects: newProjects, nextCursor: newCursor } = await FetchProjectsForPublic(username, nextCursor);
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
                FetchAllProjects();
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    },
        [loading, hasMore]
    );

    const FetchUser = async () => {
        const response = await FetchProfileForPublic(username);
        if (response) setUserData(response);
        // console.log(userData, '==profile');

    };

    useEffect(() => {
        FetchAllProjects();
        FetchUser();
    }, []);

    return (
        <>
            <div className=" relative w-full sm:w-md h-fit p-2  bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl overflow-y-auto scroll-smooth scrollbar ">

                <button onClick={() => setShareLinkModel(true)} className="share-btn absolute top-5 right-5 z-20 text-2xl text-indigo-950/50 hover:text-indigo-400/60 active:text-indigo-400/60  cursor-pointer" ><Svg name={'share'} /></button>

                <div className="relative flex flex-col items-center justify-center gap-3 p-2 border border-indigo-50/60 rounded-md inset-shadow-xs/50 inset-shadow-indigo-400 ">
                    <img className="relative w-40 h-40 mt-2 z-10 rounded-full bg-transparent backdrop-blur-xs border-4 border-indigo-100/50 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)]" src={userData?.avatar ? userData.avatar : '/avatar.webp'} alt="avatar" loading='lazy' />
                    <p className="text-indigo-950/50 text-[1.1em] ">{userData?.name}</p>
                    <div className="w-full flex flex-row items-center justify-center gap-10 ">
                        {
                            userData !== null && userData?.links && Object?.keys(userData?.links).map((key) => {
                                if (!userData.links[key] == '') {
                                    return (
                                        <div onClick={() => window.open(userData?.links[key], "_blank")} key={key} className=" p-2 rounded-full text-indigo-950/50 bg-transparent backdrop-blur-xs border-2 border-indigo-100/50 shadow-[0_8px_32px_0_rgb(0,0,0,0.1)]  hover:bg-indigo-400/10 active:bg-indigo-400/10 duration-200  cursor-pointer"><Svg name={key} /></div>
                                    );
                                }

                            })
                        }
                    </div>

                </div>

                <div className=" h-full flex flex-col gap-5 my-4 text-center border border-indigo-50/60 rounded-md inset-shadow-xs/50 inset-shadow-indigo-400 p-2 overflow-y-auto scroll-smooth scrollbar ">
                    {
                        projects && projects.map((project, index) => {
                            const isLast = index === projects?.length - 1;
                            return (
                                <button key={project.id} ref={isLast ? lastProjectRef : null} onClick={() => { setIsShowHome(false); setProjectID(project.id) }} className=" relative text-indigo-950/50 flex flex-row items-center gap-1.5 p-2 rounded-md bg-transparent backdrop-blur-xs border-2 border-indigo-50 shadow-xs/50 shadow-indigo-600 hover:bg-indigo-400/10 active:bg-indigo-400/10 duration-200 cursor-pointer" ><Svg name={'project'} /> {project?.title} </button>
                            );
                        })
                    }

                    {loading && <p className='text-indigo-950/50 animate-pulse'>Loading...</p>}
                    {!hasMore && <p className="text-indigo-950/45 pb-5 animate-pulse ">No more projects.</p>}

                </div>

            </div>

            {shareLinkModel && <ShareLink setShareLinkModel={setShareLinkModel} shareUrl={import.meta.env.VITE_FRONTEND_URL + `/u/${userData?.name}`} userData={userData} />}
        </>

    )
}

export default PublicHome