import PropTypes from "prop-types";

const ProjectImage = ({imageURL, text}) => {
  return (

    <div className="h-48 w-full sm:w-[45%] sm:h-[95%] relative inset-shadow-sm p-2 rounded-md bg-white">
        <img
          className=" w-full h-full  sm:w-80 object-contain "
          src={imageURL}
          alt={text}
          loading="lazy"
        />
    </div>
  )
}
ProjectImage.propTypes = {
    imageURL: PropTypes.string,
    text: PropTypes.string,
}

export default ProjectImage