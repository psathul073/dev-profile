// PublicProfile.jsx
import { useState } from "react";
import PublicHome from "../components/Public-home";
import PublicProject from "../components/Public-project";
import { useParams } from "react-router";

export default function PublicProfile() {
  const { username } = useParams();
  const [isShowHome, setIsShowHome] = useState(true);
  const [projectID, setProjectID] = useState(null);

  return (
    <div className="relative  flex justify-center items-center p-3 bg-indigo-100 bg-[url(/bg.webp)] bg-cover bg-center min-h-screen backdrop-blur-md font-poppins overflow-hidden scrollbar">

      {/* <h1 className="uppercase fixed top-10 text-5xl text-center z-0 font-nanum bg-amber-600">Athul krishna ffggg</h1> */}

      {isShowHome ? <PublicHome setIsShowHome={setIsShowHome} username={username} setProjectID={setProjectID} /> : <PublicProject projectID={projectID} username={username} setIsShowHome={setIsShowHome} /> }

    </div>
  );
}
