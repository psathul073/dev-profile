import Svg from "../Svg";
import { useTheme } from "../../contexts/ThemeContext";
import { useCallback } from "react";

const General = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = useCallback(
    (theme) => {
      setTheme(theme);
    },
    [setTheme]
  );

  return (
    <div className="p-2 text-sm">
      <h3 className="my-2 text-base">Theme</h3>
      <div className=" w-full flex flex-row flex-wrap justify-evenly gap-5 py-4">
        <button
          onClick={() => handleTheme("light")}
          className={`${
            theme === "light" && "bg-gray-100"
          } w-full max-w-44 flex flex-col items-center justify-center rounded-xl px-8 py-5 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
        >
          <Svg name={"light"} />
          Light
        </button>
        <button
          onClick={() => handleTheme("dark")}
          className={`${
            theme === "dark" && "bg-gray-800"
          } w-full max-w-44 flex flex-col items-center justify-center rounded-xl px-8 py-5 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
        >
          <Svg name={"dark"} />
          Dark
        </button>
        <button
          onClick={() => handleTheme("system")}
          className={`${
            theme === "system" && "bg-gray-100 dark:bg-gray-800"
          } w-full max-w-44 flex flex-col items-center justify-center rounded-xl px-8 py-5 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
        >
          <Svg name={"computer2"} />
          System
        </button>
      </div>
    </div>
  );
};

export default General;
