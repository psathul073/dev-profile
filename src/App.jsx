
import { useState } from "react";
import Home from "./components/Home";
import ProjectView from "./components/ProjectView";
import "./index.css";
import { Footer } from "./components/Footer";

function App() {
  // Set project view visible
  const [isVisible, setVisible] = useState(false);
  // Set project details
  const [project, setProject] = useState({});
  
  // Get project data
  function viewProject (item) {
    // console.log(item);
    setProject(item);
    setVisible(!isVisible);
  }
  return (
    <div className=" h-dvh p-0 m-0 md:flex justify-center items-center bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] box-border touch-none">
     {isVisible ? <ProjectView projectData={project} exitButton={setVisible} cardId ={project.cardId} /> : <Home  viewProject = {viewProject} />}
     <Footer />
    </div>
  );
}

export default App;
