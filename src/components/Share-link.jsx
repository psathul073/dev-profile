import Svg from './Svg';
import { Link, useNavigate } from 'react-router';
import { BadgeCheck, X } from 'lucide-react';

const ShareLink = ({ shareUrl, setShareLinkModel, userData }) => {

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
        <div className='z-20 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex items-center justify-center p-2.5 overflow-hidden'>
       
            <div className='profile-share w-full max-w-[425px] p-3 content-center text-center bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn '>

                <div className='w-full flex flex-row items-center justify-between mb-4'>
                    <h1 className='text-lg font-medium '>Share Dev profile</h1>
                    <button className='p-1.5 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-red-800/10 hover:text-red-800 transition cursor-pointer' onClick={() => setShareLinkModel(false)}> <X size={18} strokeWidth={1.5}/> </button>
                </div>

                <div className=' flex flex-col justify-center items-center '>

                    <div className='url-box w-44 h-40 flex flex-col items-center justify-center rounded-xl bg-indigo-50/5 backdrop-blur-xs shadow mb-4 cursor-pointer hover:-translate-y-4 duration-200'>
                        <img className=' w-20 h-20 rounded-full border border-indigo-200 p-0.5 ' src={userData?.avatar ?? '/avatar.webp'} alt="avatar" />
                        <p className=" flex flex-row items-center justify-center gap-1.5 my-0.5 text-[15px] ">@{userData?.name} {userData?.verified && <BadgeCheck size={20} className='text-blue-500' />}</p>
                        <p className='text-xs'>/{userData?.name}</p>
                    </div>

                    <div className='share-links w-full flex justify-evenly items-center'>
                        <button onClick={handleCopy} className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-indigo-800/10 hover:text-indigo-800 transition cursor-pointer' ><Svg name={"copy"} /></button>
                        <Link to={`https://wa.me/?text=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-green-800/10 hover:text-green-800 transition cursor-pointer'><Svg name={'wa'} /></Link>
                        <Link to={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-rose-800/10 hover:text-rose-800 transition cursor-pointer' ><Svg name={'ig'} /></Link>
                        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-blue-800/10 hover:text-blue-800 transition cursor-pointer' ><Svg name={'fb'} /></Link>
                        <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-blue-800/10 hover:text-blue-800 transition cursor-pointer' ><Svg name={'lk'} /></Link>
                        <Link to={`https://twitter.com/intent/tweet?url=${encodedURL}`} target="_blank" rel="noopener noreferrer" className='p-2 rounded-full bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-200/10 hover:bg-zinc-900/30 hover:text-zinc-700 transition cursor-pointer' ><Svg name={'x'} /></Link>
                    </div>

                </div>

                <p className='my-4 text-sm '>Register your Dev Profile</p>
              
                <button onClick={() => navigate('/login')} className='w-8/12 px-3 py-2 mb-4 rounded-3xl bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5 hover:bg-indigo-900  transition duration-200 cursor-pointer '>Register</button>

                <p className=' text-center text-xs'>Made with ❤️ by d9.coder {new Date().getFullYear()}</p>

            </div>

        </div>
    )
}

export default ShareLink