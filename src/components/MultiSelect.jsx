import { useState, useRef, useEffect, memo } from "react";
import Svg from "./Svg";

const allOptions = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "tw", label: "Tailwindcss." },
  { value: "bt", label: "Bootstrap" },
  { value: "sass", label: "Sass" },
  { value: "react", label: "React" },
  { value: "nx", label: "Next.js" },
  { value: "rq", label: "React Query" },
  { value: "rr", label: "React Router" },
  { value: "rhf", label: "React Hook Form." },
  { value: "axios", label: "Axios" },
  { value: "git", label: "Git" },
  { value: "gh", label: "Github" },
  { value: "npm", label: "NPM" },
  { value: "nodeJs", label: "Node.js" },
  { value: "exJs", label: "Express.js" },
  { value: "threeJs", label: "Three.js" },
  { value: "pg", label: "PostgreSQL" },
  { value: "mdb", label: "MongoDB" },
  { value: "fb", label: "Firebase" },
  { value: "sqz", label: "Sequelize" },
  { value: "dk", label: "Docker" },
  { value: "bdr", label: "Blender" },
  { value: "cv", label: "Canva" },
  { value: "fm", label: "Figma" },
  { value: "vs", label: "VS Code" },
  { value: "ws", label: "Websocket" },
  { value: "cy", label: "Cloudinary" },
];

const MultiSelect = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Filter out selected options from available list.
  const availableOptions = allOptions.filter(
    (opt) => !selected.some((sel) => sel.value === opt.value)
  );

  // Select option
  const handleSelect = (value, label) => {
    setSelected((prev) =>
      prev.some((opt) => opt.value === value)
        ? prev
        : [...prev, { value, label }]
    );
    setIsOpen(false); // close after selection.
  };

  // Delete selection.
  const deleteSelection = (value) => {
    setSelected((prev) => prev.filter((opt) => opt.value !== value));
  };

  // Close dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block w-full z-40 rounded-md border border-gray-300 dark:border-gray-700 outline-4 outline-gray-200/15 dark:outline-gray-700/30"
    >
      {/* Dropdown Toggle */}
      <button
        type="button"
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center p-2.5 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ul className="flex flex-wrap items-center gap-2.5">
          {selected.length > 0 ? (
            selected.map((item) => (
              <li
                key={item.value}
                className="flex items-center gap-1 px-1.5 py-1 rounded-md text-sm bg-indigo-400/20 backdrop-blur-md"
              >
                {item.label}
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // avoid reopening dropdown.
                    deleteSelection(item.value);
                  }}
                >
                  <Svg name={"X"} />
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Select used technologies...</li>
          )}
        </ul>

        {/* {isOpen ? (
          <ArrowUpFromLine strokeWidth={1.5} className="w-24" />
        ) : (
          <ArrowDownFromLine strokeWidth={1.5} className="w-24" />
        )} */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute bottom-full max-h-[250px] mb-2 left-0 w-full bg-white/50 dark:bg-gray-800/40 backdrop-blur-lg outline-1 outline-gray-200 dark:outline-gray-700 shadow p-2 rounded-md overflow-y-auto snap-y animate-popUp">
          {availableOptions.length > 0 ? (
            availableOptions.map((opt) => (
              <li
                key={opt.value}
                className=" rounded-md px-2 py-1.5 mb-2 hover:bg-indigo-500 active:bg-indigo-500 hover:text-white snap-center snap-normal transition-colors duration-200 cursor-pointer"
                onClick={() => handleSelect(opt.value, opt.label)}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm px-1.5">No options left</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(MultiSelect);
