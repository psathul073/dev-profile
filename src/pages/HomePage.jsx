import SidebarLayout from "../layout/SidebarLayout";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (typeof localStorage.getItem("infoPopup") === Object) {
      localStorage.setItem("infoPopup", "hide");
    }
  }, []);

  return (
    <SidebarLayout>
      <div className="relative px-2 md:px-3 h-full w-full max-w-7xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 py-2.5 flex items-center justify-between bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <h2 className=" text-lg ">Public profile</h2>
        </div>

        <iframe
          src={`${import.meta.env.VITE_FRONTEND_URL}/u/${user?.name}`}
          title="Profile page"
          loading="lazy"
          className=" w-full min-h-[690px] rounded-2xl "
        ></iframe>
      </div>
    </SidebarLayout>
  );
};

export default HomePage;
