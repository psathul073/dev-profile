import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { LogoutUser } from "../api/Auth";
import Svg from "../components/Svg";
import ProfileEdit from "../components/Profile-edit";
import { useState } from "react";
import ProjectAdd from "../components/Project-add";
import ProfileDelete from "../components/Profile-delete";
import ShareLink from "../components/Share-link";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileModel, setProfileModel] = useState(false);
  const [projectAddModel, setProjectAddModel] = useState(false);
  const [profileDelModel, setProfileDelModel] = useState(false);
  const [shareLinkModel, setShareLinkModel] = useState(false);

  const handleLogout = async () => {
    await LogoutUser();
    navigate("/login");
  };


  return (
    <>
      <section className="relative h-screen flex md:items-center justify-center  bg-white bg-[url(/bg.webp)] bg-cover font-nanum text-2xl overflow-x-hidden scrollbar ">

        <div className=" relative h-fit lg:w-[1024px] py-10 px-5 flex flex-col items-baseline md:items-center md:justify-center gap-20">

          <div className="w-full flex flex-col md:flex-row items-center justify-evenly gap-20 bg-transparent ">

            <div className=" profile p-10 relative flex flex-col justify-center items-center gap-5 rounded-[92%_15%_85%_8%_/_21%_79%_10%_90%]  text-white  border border-indigo-50/30 bg-transparent backdrop-blur-xs shadow-2xl group">
              <img src={user?.avatar} alt="avatar" className=" rounded-full border-2 border-red-400 w-30 h-30" loading="lazy"/>
              <h3 className="text-2xl md:text-md  text-slate-500 ">Welcome, <span className="font-black text-red-400 "> {user?.name}</span> </h3>
              <div className="inline-block">
                <button onClick={() => setProfileDelModel(true)} className="px-3.5 py-1 mr-5 bg-red-400 text-white cursor-pointer rounded-[85%_15%_85%_15%_/_15%_85%_15%_85%] hover:bg-red-300 active:bg-red-300">Delete</button>
                <button onClick={handleLogout} className="px-3.5 py-1 border border-red-400 text-red-400  rounded-[90%_10%_90%_10%_/_10%_90%_10%_90%] cursor-pointer hover:-rotate-5 active:-rotate-5 transition-transform duration-200">
                  Logout
                </button>
              </div>


              <div className="edit absolute top-6 right-12 text-red-400 cursor-pointer" onClick={() => setProfileModel(true)}>
                <Svg name={'profileEdit'} />
              </div>
            </div>

            <div className="add-project  p-15 flex flex-col justify-center items-center gap-5 text-amber-600 rounded-[21%_79%_10%_90%_/_92%_15%_85%_8%] border border-indigo-50/30 bg-transparent backdrop-blur-xs shadow-2xl">
              <Svg name={'postCard'} className={'text-6xl'} />
              <p>Add your project !</p>
              <div className="inline-block">
                <button onClick={() => setProjectAddModel(true)} className="px-4 py-1 mr-5 bg-amber-600 text-white cursor-pointer rounded-[13%_84%_13%_84%_/_84%_13%_84%_13%] hover:bg-amber-700 active:bg-amber-700 }">Add</button>
                <button onClick={() => navigate('/project')} className="px-4 py-1 border rounded-[13%_84%_13%_84%_/_84%_13%_84%_13%] hover:-rotate-3 active:-rotate-3 cursor-pointer transition-transform duration-200"> Edit</button>
              </div>

            </div>

          </div>

          <div className="relative card-view  p-13 flex flex-col justify-center items-center gap-5 text-indigo-500 rounded-[15%_85%_15%_85%_/_85%_15%_85%_15%] border border-indigo-50/30 bg-transparent backdrop-blur-xs shadow-2xl ">
            <Svg name={"computer"} className={'text-6xl'} />
            <p> View your profile and share</p>
            <div className=" inline-block text-white ">
              <button onClick={() => navigate(`/u/${user?.name}`)} className="px-4 py-1 mr-5 bg-indigo-500 rounded-[13%_84%_13%_84%_/_84%_13%_84%_13%] cursor-pointer hover:rotate-5 active:rotate-5 transition-transform duration-200">View</button>
              <button onClick={() => setShareLinkModel(true) } className=" px-4 py-1 outline-2 outline-indigo-500  text-indigo-500 rounded-[13%_84%_13%_84%_/_84%_13%_84%_13%] cursor-pointer hover:-rotate-5 active:-rotate-5 transition-transform duration-200">Share</button>
            </div>
          </div>

        </div>

      </section>
      {profileModel && <ProfileEdit setProfileModel={setProfileModel} />}
      {projectAddModel && <ProjectAdd setProjectAddModel={setProjectAddModel} />}
      {profileDelModel && <ProfileDelete setProfileDelModel={setProfileDelModel} />}
      {shareLinkModel && <ShareLink setShareLinkModel={setShareLinkModel} shareUrl={import.meta.env.VITE_FRONTEND_URL + `/u/${user?.name}`} userData={user} /> }
    </>
  );
};

export default Home;
