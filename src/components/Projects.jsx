import Buttons from "./Buttons";
import projects from "../project"
import PropTypes from "prop-types";

const Projects = ({viewProject}) => {

  return (
    <div className=" w-full h-full relative overflow-y-scroll">
      <p className=" text-[1.2rem] font-orbitron text-slate-700 pb-2.5 sticky top-0 z-10 bg-white">
        Projects
      </p>
      <div className="flex flex-col gap-5  relative">
        {/* Add projects dynamically */}
        {projects.map((item) => {
          return (
            <Buttons
              key={item.id}
              name={item.name}
              iconName={item.iconName}
              divClass={
                "flex flex-row items-center p-2 rounded-lg inset-shadow[5px] bg-white hover:bg-indigo-100 focus:bg-indigo-100 active:bg-indigo-100 cursor-pointer transform duration-200 text-slate-700 inset-shadow-sm group "
              }
              buttonClass={
                " group-hover:text-indigo-400  group-focus:text-indigo-400 group-active:text-indigo-400 group-hover:scale-105 group-focus:scale-105 group-active:scale-105 text-4xl"
              }
              textClass={
                " m-auto font-orbitron text-[1.1rem] md:text-[1.2rem] group-hover:text-indigo-400 group-focus:text-indigo-400 group-active:text-indigo-400 sm:group-hover:scale-105 sm:group-focus:scale-105 sm:group-active:scale-105 "
              }

              viewProject={viewProject}
              imageURL={item.imageURL}
              details={item.details}
              demoLink={item.demoLink}
              sourceCode={item.sourceCode}
              cardId = {`cardId${item.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

Projects.propTypes = {
  viewProject : PropTypes.func,
}

export default Projects;
