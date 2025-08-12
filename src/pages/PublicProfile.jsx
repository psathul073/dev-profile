// PublicProfile.jsx
import { useState, lazy, Suspense } from "react";
import PublicHome from "../components/Public-home";
import { useParams } from "react-router";
import Loader from "../components/Loader";

const PublicProject = lazy(() => import('../components/Public-project'));

export default function PublicProfile() {
  const { username } = useParams();
  const [isShowHome, setIsShowHome] = useState(true);
  const [projectID, setProjectID] = useState(null);

  return (
    <div className="z-20 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex justify-center p-2.5 overflow-hidden">

      {isShowHome ? <PublicHome setIsShowHome={setIsShowHome} username={username} setProjectID={setProjectID} /> : <Suspense fallback={<Loader/>}> <PublicProject projectID={projectID} username={username} setIsShowHome={setIsShowHome} /> </Suspense> }

    </div>
  );
}
