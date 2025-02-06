import FollowIcons from "./FollowIcons";
import ProfileHead from "./ProfileHead";
import Projects from "./Projects";
import PropTypes from "prop-types";

const Home = ({viewProject}) => {

  return (
    <div className=" w-auto h-full lg:h-9/10 xl:w-1/3 md:m-auto p-5 relative bg-white flex flex-col items-center  shadow-lg  rounded-xl ">
    <ProfileHead />
    <FollowIcons />
    <Projects viewProject={viewProject} />
  </div>
  )
}
Home.propTypes = {
    viewProject : PropTypes.func,
}

export default Home