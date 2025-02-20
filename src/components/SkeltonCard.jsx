const SkeltonCard = () => {
  return (
    // <div className=" h-48 w-full sm:w-[50%] sm:h-[95%] relative rounded-md bg-gray-300 animate-pulse ">
    //     <div className=" w-full h-full  sm:w-80 "></div>
    // </div>
    
    <div className="  sm:h-1/2  w-full lg:w-1/2 relative flex py-4 sm:py-2 px-4 gap-5  flex-col justify-center items-center sm:flex-row rounded-xl z-20 shadow-md bg-white">
    {/* Button */}
    <div className=" h-[24px] w-[24px] absolute right-4 top-4 z-10 rounded-full  bg-gray-300 animate-pulse"></div>
    {/* project image */}
     <div className=" h-48 w-full sm:w-[50%] sm:h-[95%] relative rounded-md bg-gray-300 animate-pulse ">
        <div className=" w-full h-full  sm:w-80 "></div>
    </div>
     
      <div className=" flex flex-col gap-3 h-full w-full sm:w-[60%] sm:h-[95%] relative rounded-md pt-2">
        {/* Title */}
        <div className="w-2/3 h-[30px] rounded-sm bg-gray-300 animate-pulse ">
        </div>

        <div className="w-5/6 h-[24px] rounded-sm bg-gray-300 animate-pulse ">
        </div>
        <div className="w-5/6 h-[24px] rounded-sm bg-gray-300 animate-pulse ">
        </div>
        <div className="w-5/6 h-[24px] rounded-sm bg-gray-300 animate-pulse ">
        </div>
        <div className="w-5/6 h-[24px] rounded-sm bg-gray-300 animate-pulse ">
        </div>
        <div className="w-1/2 h-[24px] rounded-sm bg-gray-300 animate-pulse ">
        </div>
        <div className="w-1/2 h-[24px] ">
        </div>
      
        <div className="w-full flex justify-evenly cursor-pointer border-t border-slate-200 pt-2">
          <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse "></div>
          <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse "></div>
          <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse "></div>
        </div>

      </div>
    </div>
 
  )
}

export default SkeltonCard