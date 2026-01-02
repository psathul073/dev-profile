import { lazy, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import Svg from "../components/Svg";

const General = lazy(() => import("../components/Settings/General"));
const Account = lazy(() => import("../components/Settings/Account"));
const About = lazy(() => import("../components/Settings//About"));

const navigationItems = [
  {
    id: "general",
    label: "General",
    icon: "settings",
    component: <General />,
  },
  {
    id: "account",
    label: "Account",
    icon: "account",
    component: <Account />,
  },
  {
    id: "about",
    label: "About",
    icon: "about",
    component: <About />,
  },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("general");

  const ActiveComponent = navigationItems.find(
    (item) => item.id === activeSection
  )?.component || <General />;

  return (
    <SidebarLayout>
      <div className="relative h-full px-2 md:px-4 w-full max-w-6xl mx-auto text-gray-700 dark:text-gray-300 ">
        {/* Head section */}
        <div className=" w-full flex justify-between items-center mt-2  backdrop-blur-sm">
          <h2 className="text-lg">Settings</h2>
          <button
            aria-label="Back Button"
            className=" p-2 rounded-lg active:bg-gray-100 hover:bg-gray-100 active:dark:bg-gray-800/60 hover:dark:bg-gray-800/60 cursor-pointer"
          >
            <Svg name={"arrowLeft"} />
          </button>
        </div>

        <div className="h-[600px] flex flex-row max-sm:flex-col gap-4 mt-4 p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ">
          {/* Sidebar Navigation */}
          <div className="lg:w-44 flex-shrink-0 rounded-2xl ">
            <div className="sticky top-8 ">
              <nav className=" flex flex-col max-sm:flex-row gap-4 overflow-x-scroll ">
                {navigationItems.map((item) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-all ${
                        activeSection === item.id
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Svg name={item.icon} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <div className="h-full">
              {/* Dynamic Component Renders Here */}
              {ActiveComponent}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SettingsPage;
