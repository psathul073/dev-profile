import Svg from "../Svg";

const PublicHomeSkeleton = () => {
  return (
    <div className=" relative w-full max-w-[500px] h-full flex flex-col gap-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 shadow-2xs">
      {/* Header */}
      <div className=" absolute top-1 right-1 z-20 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

      {/* User details */}
      <div className="relative flex flex-col items-center justify-center p-2.5 gap-3 ">
        <div className="relative w-28 h-28 my-4 z-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />

        <div className=" shrink-0 h-6 w-40 flex flex-row items-center justify-center gap-1.5 mb-4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

        <div className="w-full h-full flex flex-row items-center justify-center overflow-x-scroll gap-10 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className=" shrink-0 h-9 w-9 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className=" h-full flex flex-col gap-5 p-2.5 overflow-y-scroll">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            className=" h-10 relative flex flex-row items-center gap-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PublicHomeSkeleton;
