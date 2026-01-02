const PublicProjectSkeleton = () => {
  return (
    <>
      {/* Public project section */}
      <div className=" relative h-fit w-full max-md:max-w-80 max-w-[768px] p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 animate-popIn">
        <div className=" relative h-full flex flex-col md:flex-row justify-between max-md:items-center gap-3 group ">
          {/* Image section */}
          <div className="w-72 h-80 shrink-0 object-center rounded-lg  bg-gray-200 dark:bg-gray-800 animate-pulse" />

          {/* Details section */}
          <div className=" w-full max-h-full flex flex-col justify-between ">
            <div className=" space-y-2">
              {/* Header */}
              <div className=" w-full inline-flex justify-between items-center mb-3">
                <div className=" h-7 w-60 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse "></div>
              </div>

              {/* Description */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className=" h-5 bg-gray-200 dark:bg-gray-800 rounded-md mb-3 animate-pulse"
                ></div>
              ))}

              {/* Tags */}
              <ul className=" flex flex-row items-center flex-wrap gap-2 my-4 ">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li
                    key={idx}
                    className=" w-20 h-5 bg-gray-200 dark:bg-gray-800 pb-1 rounded-md animate-pulse"
                  ></li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="w-full flex justify-evenly items-center my-3">
              <div className="flex items-center justify-center gap-1 w-20 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div className="flex items-center justify-center gap-1  w-20 h-9  rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div className="flex items-center justify-center gap-1  w-20 h-9  rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProjectSkeleton;
