import Buttons from "./Buttons";
import projects from "../project"
import PropTypes from "prop-types";

const Projects = ({viewProject}) => {

  return (
    <div className=" w-full h-full font-poppins relative overflow-y-scroll">
      <p className=" text-xl  font-medium font-sans text-slate-700 pb-2.5">
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
                "flex flex-row items-center  p-2 rounded-lg inset-shadow-sm bg-white hover:bg-indigo-500 focus-within:bg-indigo-500 cursor-pointer transform duration-200  text-slate-700 group  "
              }
              buttonClass={
                " group-hover:text-white group-hover:scale-105 group-focus-within:scale-105 text-4xl"
              }
              textClass={
                " m-auto font-sans group-hover:text-white group-hover:scale-105 group-focus-within:scale-105 text-xl "
              }

              viewProject={viewProject}
              imageURL={item.imageURL}
              details={item.details}
              demoLink={item.demoLink}
              sourceCode={item.sourceCode}
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
