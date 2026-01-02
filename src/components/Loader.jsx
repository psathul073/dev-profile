import { memo } from "react"

const Loader = () => {

  return (
    <div className=" fixed inset-0 z-50 bg-grid-pattern bg-white dark:bg-black text-gray-800 dark:text-gray-200 h-full w-full text-center content-center ">
    
      <h1 className="flex justify-center items-center gap-3">
        <span className="loader2"></span> Just a sec ...
      </h1>
    </div>
  );
}

export default memo(Loader);