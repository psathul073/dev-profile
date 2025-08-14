import { useAuth } from "../contexts/AuthContext";
import { BookMarked, Edit, FilePen, FolderOpen, Heart, LogOut, Mail, PackagePlus, Trash2 } from 'lucide-react';
import Switch from "./Switch";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FetchCounts } from "../api/FetchProjects";
import { LogoutUser } from "../api/Auth";

const BentoGrid = ({ setProfileEdit, setProjectAddModel, setProfileDelModel }) => {
    const [count, setCount] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await LogoutUser();
        localStorage.removeItem(`projects-${user?.name}`);
        localStorage.removeItem(`cursor-${user?.name}`);
        localStorage.removeItem(`user-${user?.name}`);
        navigate("/login");
    };


    // Total projects and likes count.
    const fetchCounts = async () => {
        const result = await FetchCounts();
        setCount(result)
    }

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <div className="relative z-10 w-full h-screen 
    grid grid-cols-0 gap-4 
    md:grid-cols-1
    lg:grid-cols-2
    2xl:grid-cols-3
    backdrop-blur-2xl p-2.5 overflow-y-auto scroll-smooth">

            {/* Public profile view */}
            <div className="bg-indigo-50/10 backdrop-blur-lg border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-3xl p-2.5 row-span-2">
                <iframe
                    src={`${import.meta.env.VITE_FRONTEND_URL}/u/${user?.name}`}
                    loading="lazy"
                    className="w-full h-full min-h-[500px] rounded-2xl">
                </iframe>
            </div>

            {/* Profile */}
            <div className="bg-indigo-50/10 backdrop-blur-lg border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-3xl p-2.5 font-poppins text-indigo-950 dark:text-indigo-100 ">
                <h1 className="flex items-center justify-between p-2.5 font-semibold text-[19px] ">
                    Update Profile
                    <button
                        onClick={() => setProfileEdit(true)}
                        className="text-indigo-50 bg-indigo-950 p-2 rounded-full hover:bg-indigo-800 active:bg-indigo-800 cursor-pointer">
                        <Edit strokeWidth={1.5} />
                    </button>
                </h1>

                <div className="flex flex-col items-center gap-3 rounded-2xl p-2.5">
                    <img src={user?.avatar ? user.avatar : '/avatar.webp'} alt="avatar" loading="lazy"
                        className="w-32 h-32 object-contain object-center border border-indigo-200 p-1 rounded-full" />
                    <div className="space-y-1 text-center text-[17px]">
                        <p className="text-indigo-500 font-extralight">@{user?.name}</p>
                        <p><Mail strokeWidth={1.5} className="inline-block mr-2" />{user?.email}</p>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-5 space-x-1 my-2">
                    <div className="flex flex-row justify-center items-center gap-2 bg-rose-400/10 text-rose-400 px-2 py-1.5 rounded-full text-[15px] "><Heart size={18} strokeWidth={1.4} /> <span>Likes : {count?.totalLikes || '000'}</span></div>
                    <div className="flex flex-row justify-center items-center gap-2 bg-orange-400/10 text-orange-400 px-2 py-1.5 rounded-full text-[15px]"><FolderOpen size={18} strokeWidth={1.4} /> <span>Projects: {count?.totalProject || '000'}</span></div>
                </div>

            </div>

            {/* Add project */}
            <div className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-3xl p-4 font-poppins text-indigo-950 dark:text-indigo-100">
                <h1 className="text-[19px] font-semibold mb-2">Add New Project</h1>
                <p className="text-[17px] mb-4">
                    Showcase your latest work by adding a new project with a title, description, links, and images.
                </p>
                <div className="content-end h-full self-end">
                    <button onClick={() => setProjectAddModel(true)} className=" bg-indigo-950 text-white p-2 rounded-full hover:bg-indigo-800 active:bg-indigo-800 transition cursor-pointer"><PackagePlus /></button>
                </div>

            </div>

            {/* Edit project */}
            <div className=" flex flex-col bg-indigo-50/10 backdrop-blur-lg border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-3xl p-4 font-poppins text-indigo-950 dark:text-indigo-100">
                <h1 className="text-[19px] font-semibold mb-2 ">Edit Existing Project</h1>

                <p className="text-[17px]  mb-4">
                    Update details, improve descriptions, or change links and media for your existing projects.
                </p>

                <div className="content-end h-full self-end">
                    <button onClick={() => navigate('/project')} className=" bg-indigo-950 text-white p-2 rounded-full hover:bg-indigo-800 active:bg-indigo-800 transition cursor-pointer"><FilePen /></button>
                </div>

            </div>

            {/* Settings */}
            <div className=" flex flex-col bg-indigo-50/10 backdrop-blur-lg border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-3xl p-4 font-poppins text-indigo-950 dark:text-indigo-100">
                <h1 className="text-[19px] font-semibold mb-2 ">Settings</h1>

                <div className="flex flex-row justify-between items-center mb-6">
                    <p className="text-[17px">Theme</p><Switch />
                </div>

                <div className="flex flex-row justify-between items-center mb-6">
                    <p className="text-[17px">API Doc</p>
                    <button className=" p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-indigo-400/10 hover:text-indigo-400 active:bg-indigo-400/10 active:text-indigo-400 transition cursor-pointer" onClick={() => navigate('/api-doc')}><BookMarked strokeWidth={1.5} /> </button>
                </div>

                <div className="flex flex-row justify-between items-center mb-6">
                    <p className="text-[17px">Account Removal</p>
                    <button onClick={() => setProfileDelModel(true)} className=" p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-red-400/10 hover:text-red-400 active:bg-red-400/10 active:text-red-400 transition cursor-pointer"><Trash2 strokeWidth={1.5} /> </button>
                </div>

                <div className="flex flex-row justify-between items-center mb-6">
                    <p className="text-[17px">Log Out</p>
                    <button className=" p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-red-400/10 hover:text-red-400 active:bg-red-400/10 active:text-red-400 transition cursor-pointer" onClick={() => handleLogout()}><LogOut /></button>
                </div>

                <div className=" h-full content-end text-center text-[14px]">
                    <Link to={"/privacy-policy"} className="mr-2 transition hover:text-blue-500 active:text-blue-500">Privacy Policy</Link>
                    .
                    <Link to={"/terms-conditions"} className="ml-2 transition hover:text-blue-500">Terms of Conditions</Link>
                </div>

            </div>

        </div>

    )
}

export default BentoGrid