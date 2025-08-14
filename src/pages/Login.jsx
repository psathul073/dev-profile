import { useState } from "react";
import CheckBox from "../components/CheckBox";
import Svg from "../components/Svg";


const Login = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        if (!isChecked) {
            setMessage('Please accept the terms and conditions!');
            return;
        } else {
            window.open(`${import.meta.env.VITE_BACKEND_API_URL}/auth/google`, "_self"); // Redirect to Google login
        }

    };

    const handleGitHubSignIn = async () => {
        if (!isChecked) {
            setMessage('Please accept the terms and conditions!');
            return;
        } else {
            window.open(`${import.meta.env.VITE_BACKEND_API_URL}/auth/github`, "_self");
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-t from-slate-950 to-indigo-950 ">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.15),transparent_70%)]"></div>

            <div className="relative z-10 flex flex-row items-center justify-evenly w-full h-screen backdrop-blur-2xl p-2.5 ">

                <div className="max-sm:hidden " >
                    <img src="/computer.webp" alt="computer image" className=" brightness-150 grayscale-25 drop-shadow-2xl drop-shadow-indigo-800/30 " />
                </div>

                <div className=" w-full max-w-[400px] relative px-5 rounded-xl bg-indigo-950/10 content-center text-center border border-indigo-200 outline-4 outline-indigo-200/15 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] ">

                    <h1 className=" text-2xl  text-indigo-200 my-10">Hey, Developer </h1>

                    {message && <p className="text-red-800 font-medium animate-popIn">{message}</p>}

                    <div className=" w-full flex flex-col items-center justify-center gap-5 mt-15 mb-10 text-indigo-100">

                        <button onClick={handleLogin} className=" w-[95%] flex justify-center items-center gap-2 text-lg px-4 py-3.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-900/20 active:bg-indigo-900/20 cursor-pointer ">
                            <Svg name={'google'} /> Sign in with Google
                        </button>

                        <p>or</p>

                        <button onClick={handleGitHubSignIn} className=" w-[95%] flex justify-center items-center gap-2 text-lg px-4 py-3.5  text-md rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-900/20 active:bg-indigo-900/20 cursor-pointer ">
                            <Svg name={'github'} className={'text-2xl'} /> Sign in with Github
                        </button>
                    </div>

                    <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} setMessage={setMessage} />

                </div>

            </div>

        </div>
    )
}

export default Login