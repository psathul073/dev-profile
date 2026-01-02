import { memo, useState } from "react";
import CheckBox from "../components/CheckBox";
import Svg from "../components/Svg";
import { useToast } from "d9-toast";

const Login = ({ ref }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState({ google: false, github: false });
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!isChecked) {
      showToast({
        message: "Please accept the terms and conditions!",
        type: "warning",
        position: "top-right",
        theme: "dark",
        title: false,
        duration: 3000,
      });
      return;
    } else {
      setLoading(prev => ({...prev, google: true}));
      setDisabled(true);
      window.open(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/google`,
        "_self"
      ); // Redirect to Google login
    }
  };

  const handleGitHubSignIn = async () => {
    if (!isChecked) {
      showToast({
        message: "Please accept the terms and conditions!",
        type: "warning",
        position: "top-right",
        theme: "dark",
        title: false,
        duration: 3000,
      });
      return;
    } else {
      setLoading((prev) => ({ ...prev, github: true }));
      setDisabled(true);
      window.open(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/github`,
        "_self"
      );
    }
  };

  return (
    <div
      ref={ref}
      className=" fixed top-1/2 right-60 max-sm:right-1/2 -translate-y-1/2 max-sm:translate-x-1/2 z-20 w-full max-w-[380px] h-fit px-5 rounded-xl backdrop-blur-xl bg-violet-400/5 content-center text-center border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl shadow-violet-600/20 animate-scale "
    >
      <h1 className=" text-xl text-violet-50 my-10">Hello, Developer </h1>

      <div className=" w-full flex flex-col items-center justify-center gap-5 mt-15 mb-10 text-indigo-100">
        <button
          disabled={disabled}
          onClick={handleLogin}
          className=" disabled:cursor-not-allowed w-[95%] flex justify-center items-center gap-2 text-lg px-4 py-3 rounded-xl backdrop-blur-3xl border border-indigo-200 outline-4 outline-indigo-200/15 hover:bg-indigo-900/20 active:bg-indigo-900/20 cursor-pointer "
        >
          <Svg name={loading.google ? "loading" : "google"} /> Sign in with Google
        </button>

        <p>OR</p>

        <button
          disabled={disabled}
          onClick={handleGitHubSignIn}
          className=" disabled:cursor-not-allowed w-[95%] flex justify-center items-center gap-2 text-lg px-4 py-3  text-md rounded-xl bg-indigo-800/20 border border-indigo-200 outline-4 outline-indigo-200/15 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-900/20 active:bg-indigo-900/20 cursor-pointer "
        >
          <Svg name={loading.github ? "loading" : "github"} className={"text-2xl"} />{" "}
          Sign in with Github
        </button>
      </div>

      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
};

export default memo(Login);
