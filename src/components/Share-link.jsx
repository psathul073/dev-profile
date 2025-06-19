import React from 'react'
import Svg from './Svg';
import { Link, useNavigate } from 'react-router';

const ShareLink = ({ shareUrl, setShareLinkModel, userData }) => {
    // console.log(shareUrl);
    const encodedURL = encodeURIComponent(shareUrl);
    const navigate = useNavigate();

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareUrl)
                .then(() => window.alert('Link copied to clipboard!'))
                .catch(() => fallbackCopy());
        } else {
            fallbackCopy();
        }
    };

    const fallbackCopy = () => {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        try {
            document.execCommand('copy');
            window.alert('Link copied (fallback)!');
        } catch (err) {
            window.alert('Failed to copy' + err);
        }
        document.body.removeChild(input);
    };


    return (
        <div className=' absolute top-0 px-2 w-full h-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex  justify-center overflow-hidden scrollbar'>
       
            <div className='profile-share relative h-fit top-1/6 w-md p-5  text-indigo-950/60 flex flex-col bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl'>

                <div className='w-full flex flex-row items-center justify-between font-semibold '>
                    <h2>Share Dev profile</h2>
                    <div onClick={() => setShareLinkModel(false)}> <Svg name={'X'} className={'text-xl cursor-pointer'} /> </div>
                </div>

                <div className=' flex flex-col justify-center items-center '>

                    <div className='url-box w-48 h-40 m-4  flex flex-col items-center justify-center rounded-xl bg-white/5 backdrop-blur-xs shadow-[0_0_15px_5px_rgb(0,0,0,0.1)] cursor-pointer hover:-translate-y-4 duration-200'>
                        <img className=' w-20 h-20 rounded-full border border-white/90 ' src={userData?.avatar ?? '/avatar.webp'} alt="avatar" />
                        <h3>@{userData?.name}</h3>
                        <p className='text-xs'>/{userData?.name}</p>
                    </div>

                    <div className='share-links w-full flex justify-evenly items-center'>
                        <button onClick={handleCopy} className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-indigo-400/50 active:bg-indigo-400/50 duration-200 cursor-pointer' ><Svg name={"copy"} /></button>
                        <Link to={`https://wa.me/?text=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-green-400/50 active:bg-green-400/50 duration-200  cursor-pointer'><Svg name={'wa'} /></Link>
                        <Link to={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-rose-500/50 active:bg-rose-500/50 duration-200  cursor-pointer' ><Svg name={'ig'} /></Link>
                        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-blue-800/50 active:bg-blue-800/50 duration-200  cursor-pointer' ><Svg name={'fb'} /></Link>
                        <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-blue-700/70 active:bg-blue-700/70 duration-200  cursor-pointer' ><Svg name={'lk'} /></Link>
                        <Link to={`https://twitter.com/intent/tweet?url=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='rounded-full p-2 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] hover:bg-zinc-900/50 active:bg-zinc-900/50 duration-200  cursor-pointer' ><Svg name={'x'} /></Link>
                    </div>

                </div>
                <p className='py-5 text-sm text-indigo-950/60'>Register your Dev Profile</p>
                <button onClick={() => navigate('/login')} className='px-1 py-2 rounded-3xl bg-indigo-400 text-white/80 hover:bg-zinc-900/50 active:bg-zinc-900/50 duration-200  cursor-pointer '>Register</button>

                <p className=' text-center mt-2 text-xs'>Made with ❤️ by d9.coder {new Date().getFullYear()}</p>

            </div>

        </div>
    )
}

export default ShareLink