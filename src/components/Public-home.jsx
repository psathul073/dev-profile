import React, { useCallback, useEffect, useRef, useState } from 'react';
import Svg from './Svg';
import { FetchProfileForPublic, FetchProjectsForPublic } from '../api/FetchProjects';
import ShareLink from './Share-link';
import { getWithExpiry, setWithExpiry } from '../utils/localStorage.js';
import { BadgeCheck, Share2 } from 'lucide-react';

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
        const updatedProjects = [...projects, ...newProjects];

        setProjects(updatedProjects);
        setNextCursor(newCursor);
        setHasMore(Boolean(newCursor));
        setLoading(false);
        // Cache projects in locally.
        setWithExpiry(`projects-${username}`, updatedProjects);
        setWithExpiry(`cursor-${username}`, newCursor);
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
        if (response) {
            setUserData(response);
            setWithExpiry(`user-${username}`, response);
        }
        // console.log(userData, '==profile');

    };

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

    return (
        <>
            <div className=" relative h-full max-h-fit w-full max-w-[460px] p-3 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn overflow-hidden ">

                <button onClick={() => setShareLinkModel(true)} className="share-btn absolute top-5 right-5 z-20 text-2xl p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-indigo-800/10 hover:text-indigo-800 transition cursor-pointer" ><Share2 size={18} strokeWidth={1.5} /></button>

                <div className="relative flex flex-col items-center justify-center p-3.5 border border-indigo-200/50 rounded-md inset-shadow-xs/50 inset-shadow-indigo-400 ">
                    <img className="relative w-32 h-32 my-4 z-10 p-1 object-contain bg-center rounded-full border border-indigo-200" src={userData?.avatar ? userData.avatar : '/avatar.webp'} alt="avatar" loading='lazy' />

                    <p className=" flex flex-row items-center justify-center gap-1.5 mb-4 text-[1.1em] text-indigo-950 dark:text-indigo-200 ">@{userData?.name} {userData?.verified && <BadgeCheck size={20} className='text-blue-500' />}</p>

                    <div className="w-full flex flex-row items-center justify-center gap-10 ">
                        {
                            userData !== null && userData?.links && Object?.keys(userData?.links).map((key) => {
                                if (!userData.links[key] == '') {
                                    return (
                                        <div onClick={() => window.open(userData?.links[key], "_blank")} key={key} className="p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-indigo-800/10 hover:text-indigo-800 transition cursor-pointer"><Svg name={key} /></div>
                                    );
                                }

                            })
                        }
                    </div>

                </div>

                <div className="flex flex-col gap-5 my-4 py-4 text-center border border-indigo-200/50 rounded-md inset-shadow-xs/50 inset-shadow-indigo-400 p-2 overflow-y-auto scroll-smooth scrollbar max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-280px)]">

                    {
                        projects && projects.map((project, index) => {
                            const isLast = index === projects?.length - 1;
                            return (
                                <button key={project.id} ref={isLast ? lastProjectRef : null} onClick={() => { setIsShowHome(false); setProjectID(project.id) }} className=" relative flex flex-row items-center gap-1.5 p-2 rounded-md bg-transparent backdrop-blur-xs border-2 border-indigo-200/50 shadow-xs/50 shadow-indigo-600 hover:bg-indigo-400/10 active:bg-indigo-400/10 duration-200 cursor-pointer" ><Svg name={'project'} /> {project?.title} </button>
                            );
                        })
                    }

                    {loading && <p className='text-rose-500 mb-4 animate-pulse'>Loading...</p>}
                    {!hasMore && <p className=" text-green-500 mb-8 animate-pulse ">No more projects.</p>}

                </div>

            </div>

            {shareLinkModel && <ShareLink setShareLinkModel={setShareLinkModel} shareUrl={import.meta.env.VITE_FRONTEND_URL + `/u/${userData?.name}`} userData={userData} />}

        </>

    )
}

export default PublicHome