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
            <div className="h-screen bg-[url('/gg.webp')]  bg-no-repeat bg-center bg-cover ">

                <div className=" relative h-full w-full flex  flex-col items-center justify-center gap-10 px-2 backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)]  text-white">


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


            </div>

        </>


    )
}

export default Login