
import PropTypes from "prop-types"
import Icons from './Icons'

const CardButton = (props) => {
  return (
    <div className="h-full flex group cursor-pointer touch-auto" onClick={props.playSound}>
      <a className=" relative flex justify-center items-center gap-1" href={props.link}>
        <button className={`hover:scale-105 focus:scale-105 active:scale-105${props.btnClass}`} disabled={props.disable} onClick={props.onClick} > <Icons name={props.iconName} /> </button>
        <span className={`invisible group-hover:visible group-focus:visible group-active:visible absolute bottom-9 px-2.5 py-0.5 text-base font-doto font-medium rounded-2xl shadow-lg ${props.spanClass}`}>{props.text}</span>
        </a>
    </div>
  )
}
CardButton.propTypes ={
    iconName : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,
    disable : PropTypes.bool.isRequired,
    link : PropTypes.string.isRequired,
    btnClass : PropTypes.string.isRequired,
    spanClass : PropTypes.string.isRequired,
    playSound : PropTypes.func.isRequired,
}
export default CardButton