import Svg from "../components/Svg";


const Login = () => {

    const handleLogin = async () => {
        window.open(`${import.meta.env.VITE_BACKEND_API_URL}/auth/google`, "_self"); // Redirect to Google login
    };

    const handleGitHubSignIn = async () => {
        window.open(`${import.meta.env.VITE_BACKEND_API_URL}/auth/github`, "_self");
    };

    return (
        <>
            <div className="relative min-h-screen bg-gradient-to-t from-slate-950 to-indigo-950 ">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.15),transparent_70%)]"></div>
            
                <div className="relative z-10 flex flex-row items-center justify-evenly w-full h-screen backdrop-blur-2xl p-2.5 ">

                    <div className="max-sm:hidden " >
                        <img src="/computer.webp" alt="computer image" className=" brightness-150 grayscale-25 drop-shadow-2xl drop-shadow-indigo-800/30 " />
                    </div>

                    <div className=" w-full max-w-[400px] relative px-5 rounded-xl bg-indigo-950/10 content-center text-center border border-slate-500/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] ">
                      
                        <h1 className=" text-2xl  text-indigo-200 my-10">Hey, Developer </h1>

                        <div className=" w-full flex flex-col items-center justify-center gap-5 my-15 text-indigo-100">
                       
                            <button onClick={handleLogin} className=" w-[90%] flex justify-center items-center gap-2 text-lg px-4 py-3.5 rounded-md border border-slate-500/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-950/20 cursor-pointer ">
                                <Svg name={'google'} /> Sign in with Google
                            </button>

                            <p>or</p>

                            <button onClick={handleGitHubSignIn} className=" w-[90%] flex justify-center items-center gap-2 text-lg px-4 py-3.5  text-md rounded-md border border-slate-500/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-950/20 cursor-pointer ">
                                <Svg name={'github'} className={'text-2xl'} /> Sign in with Github
                            </button>
                        </div>

                    </div>

                </div>

            </div>


            {/* <div className="relative min-h-screen min-h-screen bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">

                <div className=" absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),transparent)] flex  flex-col items-center justify-center gap-10 px-2 backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)]  text-white">


                    <div className=" relative h-90 sm:w-90 px-5 rounded-xl flex flex-col justify-evenly items-center bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] ">
                        <h1 className=" text-2xl text-shadow-2xs text-shadow-gray-200">Welcome to Dev Profile </h1>

                        <div className=" flex flex-col items-center justify-center gap-5 ">
                            <button onClick={handleLogin} className="flex justify-center items-center gap-2 px-3 py-2.5  rounded-md border border-neutral-50/25 bg-transparent backdrop-blur-xs shadow-2xl cursor-pointer ">
                                <Svg name={'google'} /> Sign in with Google
                            </button>
                            <p>or</p>
                            <button onClick={handleGitHubSignIn} className="flex justify-center items-center gap-2 px-3 py-2.5  text-md rounded-md border border-neutral-50/25 bg-transparent backdrop-blur-xs shadow-2xl cursor-pointer ">
                                <Svg name={'github'} className={'text-2xl'} /> Sign in with Github
                            </button>
                        </div>

                    </div>


                </div>


            </div> */}

        </>


    )
}

export default Login