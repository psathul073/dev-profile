import { useState, lazy, Suspense } from "react";
import PublicHome from "../components/Public-home";
import { useParams } from "react-router";

const PublicProject = lazy(() => import("../components/Public-project"));

export default function PublicProfile() {
  const { username } = useParams();
  const [isShowHome, setIsShowHome] = useState(true);
  const [projectID, setProjectID] = useState(null);

  return (
    <div className="z-20 fixed top-0 h-full w-full flex justify-center p-2 bg-grid-pattern bg-white dark:bg-black text-gray-700 dark:text-gray-300 overflow-hidden ">
      {isShowHome ? (
        <PublicHome
          setIsShowHome={setIsShowHome}
          username={username}
          setProjectID={setProjectID}
        />
      ) : (
        <PublicProject
          projectID={projectID}
          username={username}
          setIsShowHome={setIsShowHome}
        />
      )}
    </div>
  );
}
