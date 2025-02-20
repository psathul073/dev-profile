import Icons from "./Icons"
import PropTypes from "prop-types";

const Follow = ({ text, iconName, link}) => {
  
  return (
    <div className=" relative flex flex-col items-center">
    <button className=" text-4xl peer cursor-pointer text-slate-500 hover:text-indigo-400 focus:text-indigo-400 active:text-indigo-400 hover:scale-105 focus:scale-105  active:scale-105 transform duration-150"><a href={link}><Icons name={iconName} /> </a> </button>
    <span className=" absolute bottom-10 mb-0.5 text-center font-doto text-sm font-bold  invisible peer-hover:visible peer-focus:visible peer-active:visible text-indigo-500 bg-indigo-100 px-3 py-1 shadow-md shadow-indigo-100 rounded-full">{text}</span>
  </div>
  )
}

Follow.propTypes = {
    text : PropTypes.string,
    iconName : PropTypes.string,
    link: PropTypes.string,
}

export default Follow