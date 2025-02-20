import PropTypes from "prop-types";

const Image = ({img, text}) => {
  return (
    <div className=" w-2/5 md:w-1/4">
        <img src={img} alt= {text} loading="lazy"/>
    </div>
  )
}

Image.propTypes ={
    img : PropTypes.string,
    text : PropTypes.string,
}

export default Image