
import Buttons from "./Buttons";
import PropTypes from "prop-types";
import Icons from "./Icons";
// import ProjectImage from "./ProjectImage";
import SkeltonImage from "./SkeltonImage";
import { lazy, Suspense } from "react";

const ProjectImage = lazy( ()=> delayForImage(import("./ProjectImage"))) ;

const ProjectView = (props) => {

  const { name, details, imageURL, demoLink, sourceCode } = props.projectData;

  // Hide project view
  function exitView() {
    props.exitButton(false);
  }

  return (
    <div className=" h-dvh w-dvw absolute top-0 flex justify-center items-center px-3  bg-gray-50 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] ">
      <div className="  sm:h-1/2  w-full lg:w-1/2 relative flex py-4 sm:py-2 px-4 gap-5  flex-col justify-center items-center sm:flex-row rounded-xl z-20 shadow-md bg-white">
      <button className=" absolute right-4 top-4 z-10 text-xl p-1 bg-slate-50 sm:bg-transparent rounded-full hover:border-slate-500 hover:bg-slate-100 focus-within:border-slate-500 focus-within:bg-slate-100  cursor-pointer" onClick={exitView}><Icons name={"cross"} /> </button>

      <Suspense fallback={<SkeltonImage />}>
        <ProjectImage imageURL={imageURL} text={name}/>
      </Suspense>
       
        <div className=" flex flex-col gap-3 h-full sm:w-[60%] relative rounded-md pt-2">

          <div className=" text-xl font-medium">
            <p>{name}</p> 
          </div>

          <div className="overflow-y-scroll h-80 sm:mb-18 sm:h-auto">
              <p>{details}</p>
          </div>
        
          <div className=" w-full flex sm:absolute bottom-4  justify-center sm:justify-end gap-10 mt-2 sm:pr-10 cursor-pointer">
            <Buttons name={"Code"} link={sourceCode} divClass={"flex justify-center items-center w-24 h-10 p-2 rounded-full  bg-indigo-500 text-white text-white hover:bg-indigo-300 focus-within:bg-indigo-300"} />
            <Buttons name={"Demo"} link={demoLink} divClass={"flex justify-center items-center w-24 h-10 p-2 rounded-full border-2  text-indigo-600  hover:border-indigo-400 hover:text-indigo-400  focus-within:border-indigo-400 focus-within:text-indigo-400"} />
          </div>

        </div>
      </div>
    </div>
  );
};

// Load skelton image...
async function delayForImage(images) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => images);
}

ProjectView.propTypes = {
  exitButton: PropTypes.func,
  projectData: PropTypes.object,
};

export default ProjectView;
