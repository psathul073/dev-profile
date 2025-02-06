import Icons from "./Icons"
import PropTypes from "prop-types";

const Follow = ({ text, iconName, link}) => {
  
  return (
    <div className=" relative flex flex-col items-center">
    <button className=" text-4xl peer cursor-pointer text-slate-500 hover:text-indigo-600 focus-within:text-indigo-600 hover:scale-105 focus-within:scale-105 transform duration-150"><a href={link}><Icons name={iconName} /> </a> </button>
    <span className=" absolute bottom-10 md:pb-1 text-center font-sans text-sm  invisible peer-hover:visible peer-focus-within:visible bg-indigo-500 text-white px-3 py-0.5 shadow-md rounded-full">{text}</span>
  </div>
  )
}

Follow.propTypes = {
    text : PropTypes.string,
    iconName : PropTypes.string,
    link: PropTypes.string,
}

export default Follow