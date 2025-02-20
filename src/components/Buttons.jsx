import PropTypes from "prop-types"
import Icons from "./Icons"

const Buttons = (props) => {
  
  return (
    <div onClick={ () => props.viewProject(props)}>
    <a className={props.divClass}  href={props.link}>
       <button className={props.buttonClass}> <Icons name={props.iconName} /></button>
       <p className={props.textClass}>{props.name}</p>
    </a>
    </div>
  )
}

Buttons.propTypes = {
    name : PropTypes.string,
    iconName : PropTypes.string,
    divClass : PropTypes.string,
    buttonClass : PropTypes.string,
    textClass : PropTypes.string,
    viewProject : PropTypes.func,
    link : PropTypes.string,
}

export default Buttons