import { Link } from "react-router";

const About = () => {
  return (
    <div className="p-2 text-sm">
      <div className=" flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
        <p>Terms of Use</p>
        <Link
          to={"/terms-conditions"}
          className=" px-6 pt-1.5 pb-2 rounded-full border border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          View
        </Link>
      </div>
      <div className=" flex justify-between items-center py-4">
        <p>Privacy Policy</p>
        <Link
          to={"/privacy-policy"}
          className=" px-6 pt-1.5 pb-2 rounded-full border border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default About