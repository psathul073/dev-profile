import { memo, useCallback } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import Svg from "../components/Svg";
import { NavLink } from "react-router";

const navItems = [
  {
    id: "#001",
    title: "Home",
    icon: <Svg name={"home"} />,
    link: "/",
  },
  {
    id: "#002",
    title: "Profile",
    icon: <Svg name={"profile"} />,
    link: "/profile",
  },
  {
    id: "#003",
    title: "Projects",
    icon: <Svg name={"code"} />,
    link: "/project",
  },
  {
    id: "#004",
    title: "API Doc",
    icon: <Svg name={"doc"} />,
    link: "/api-doc",
  },
  {
    id: "#005",
    title: "Settings",
    icon: <Svg name={"settings"} />,
    link: "/settings",
  },
];

const SidebarLayout = ({ children }) => {
  const { showSidebar, setShowSidebar } = useSidebar();

  const handleSidebar = useCallback(() => {
    if (showSidebar) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [showSidebar, setShowSidebar]);

  return (
    <div className=" relative h-screen flex flex-row bg-grid-pattern bg-white dark:bg-black text-gray-700 dark:text-gray-300 overflow-hidden">
      <aside
        className={`${
          showSidebar ? "w-60 block" : "w-[55px] max-sm:hidden"
        } z-40 shrink-0  p-2 max-sm:fixed min-h-full rounded-r-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 transition-[width] duration-500 `}
      >
        {/* Header */}
        <div
          className={` w-full flex shrink-0 items-center font-semibold px-1.5 mb-4 ${
            showSidebar ? "justify-between" : "justify-center"
          } `}
        >
          {/* <p
            className={` shrink-0 text-nowrap text-lg transition-all duration-100 ${
              showSidebar ? " block" : "hidden"
            }`}
          >
            Dev Profile
          </p> */}

          <img
            src="/dp.webp"
            alt="logo image"
            width={30}
            height={30}
            className={`${!showSidebar && "hidden"}`}
          />

          <button
            aria-label="Sidebar close"
            className=" p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-w-resize"
            onClick={handleSidebar}
          >
            <Svg
              name={showSidebar ? "sidebarLeftCollapse" : "sidebarLeftExpand"}
            />
          </button>
        </div>

        {/* Nav items */}
        <ul className=" flex flex-col gap-5">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                      : " hover:bg-gray-100 dark:hover:bg-gray-800"
                  } ${
                    showSidebar ? "w-full" : "w-fit"
                  } relative flex items-center shrink-0 gap-2.5 p-2 rounded-lg text-sm font-medium group cursor-pointer`
                }
              >
                {item.icon}
                <p
                  className={`${
                    !showSidebar
                      ? "absolute left-13 top-1/2 -translate-y-1/2 bg-gray-800 text-gray-300 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
                      : "w-full opacity-100"
                  }`}
                >
                  {item.title}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main className=" relative flex-auto max-sm:mt-11  overflow-y-scroll">
        <nav className=" fixed top-0  hidden max-sm:inline-flex items-center gap-2.5 py-2 px-2.5">
          <button aria-label="Menu button" onClick={() => setShowSidebar(true)}>
            <Svg name={"menu"} />
          </button>
          <p className="font-semibold">DEV PROFILE</p>
        </nav>
        <section className=" flex justify-center">{children}</section>
      </main>
    </div>
  );
};

export default memo(SidebarLayout);
