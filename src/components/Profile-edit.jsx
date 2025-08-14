import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FetchUser } from '../api/Auth'
import { useNavigate } from 'react-router';
import { profileUpdates } from '../api/Profile';
import Svg from './Svg';
import { X } from 'lucide-react';

const ProfileEdit = ({ setProfileEdit }) => {

    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState();
    const [msg, setMsg] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const profileRef = useRef(null);
    const navigate = useNavigate();

    // Form submit
    const onSubmit = async (data) => {
        // console.log(data, '==form');
        setLoading(true);

        // Create new form
        const formData = new FormData();

        Object.keys(data).forEach((Keys) => {
            if (data[Keys] instanceof FileList && data[Keys].length > 0) {
                formData.append(Keys, data[Keys][0]);
            } else {
                formData.append(Keys, data[Keys] ?? '');
            }
        });
        
        localStorage.removeItem(`projects-${user?.name}`);
        localStorage.removeItem(`cursor-${user?.name}`);
        localStorage.removeItem(`user-${user?.name}`);

        // Update profile
        const response = await profileUpdates(formData);

        setLoading(false);
        if (!response?.type) {
            setMsg(response?.message);
        } else {
            navigate(0);
        }

    };

    const handleChange = (e) => {
        setMsg('');
        const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes
        const allowedTypes = ['image/png', 'image/webp', 'image/jpeg'];
        const selectedIMG = e.target.files[0];
        const invalidFile = !allowedTypes.includes(selectedIMG.type);

        if (!selectedIMG) return; // If no file selected.

        if (selectedIMG.size > MAX_FILE_SIZE) {
            setMsg('file size > 1.5Mb')
            return; // Set maximum size below 1.5Mb. 
        }
        if (invalidFile) {
            setMsg('Invalid file type!');
            return;
        }

        setValue(e.target.id, selectedIMG); // Directly store  in the form
        setMsg(null);

        // Set image preview.
        const objURL = URL.createObjectURL(selectedIMG);
        setAvatar(objURL);
    };

    // Revoke url.
    useEffect(() => {
        return () => {
            if (avatar) {
                URL.revokeObjectURL(avatar);
            }
        };
    }, [avatar]);

    useEffect(() => {
        const userData = async () => {
            const result = await FetchUser();
            setUser(result);
        }
        userData();

    }, []);

    useEffect(() => {
        reset({
            name: user?.name,
            gh: user?.links?.gh,
            ig: user?.links?.ig,
            lk: user?.links?.lk,
            yt: user?.links?.yt,
            x: user?.links?.x,
        });
    }, [user, reset]);

    // Hide profile model when click outside.
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileEdit(false);
            };
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, []);

    return (
        <div className='z-20 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex md:items-center justify-center p-2.5 overflow-y-auto'>

            <div ref={profileRef} className='profile-edit  relative h-fit w-full max-w-[460px] p-3 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn '>

                <h3 className=' flex flex-row justify-between items-center text-lg font-medium '>Profile Edit
                    <button onClick={() => setProfileEdit(false)} className='rounded-full p-1.5 bg-indigo-200/10 hover:bg-indigo-200/20 cursor-pointer'> <X strokeWidth={1.5} /></button>
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className='content-center text-center'>

                    <div className='relative p-2 flex flex-col justify-center items-center rounded-full group transform duration-200'>
                        <img src={avatar ? avatar : user?.avatar} alt="avatar" className=' w-40 h-40 rounded-full object-contain bg-center border border-indigo-200 p-1' loading='lazy' />
                        <label htmlFor="avatar" className='invisible absolute h-36 w-36  rounded-full flex justify-center items-center text-2xl text-shadow-white cursor-pointer bg-transparent backdrop-blur-xs group-hover:visible group-active:visible'> <Svg name={'camera'} className={"text-white"} /> </label>
                        <input type="file" name="avatar" id="avatar" accept="image/png, image/webp, image/jpeg" className=' hidden' onChange={handleChange} />
                    </div>

                    {msg && <p className='text-center font-light text-red-400'>{msg}</p>}

                    <div className=' flex flex-col gap-4 my-3 '>

                        <div className=' flex flex-row items-center gap-1.5 text-[17px] px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'verifyUser'}></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.name && 'text-red-500'}`} type="text" name="name" id="name" placeholder='Username'{...register('name')} />
                        </div>

                        <div className='flex flex-row items-center gap-1.5 text-[17px]  px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'gh'}></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.gh && 'text-red-500'}`} type="url" name="gh" id="gh" placeholder='Github URL' {...register('gh', { required: true, })} />
                        </div>

                        <div className='flex flex-row items-center gap-1.5 text-[17px]  px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'ig'}></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.ig && 'text-red-500'}`} type="url" name="ig" id="ig" placeholder='Instagram URL' {...register('ig', { required: true })} />
                        </div>

                        <div className='flex flex-row items-center gap-1.5 text-[17px]  px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'yt'}></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.yt && 'text-red-500'}`} type="url" name="yt" id="yt" placeholder='Youtube URL' {...register('yt')} />
                        </div>

                        <div className='flex flex-row items-center gap-1.5 text-[16px]  px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'lk'}></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.lk && 'text-red-500'}`} type="url" name="lk" id="lk" placeholder='Linkedin URL' {...register('lk', { required: true })} />
                        </div>
                        <div className='flex flex-row items-center gap-1.5 text-[16px]  px-2.5 py-1.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15'>
                            <Svg className={"inline-block"} name={'x'} ></Svg>
                            <input className={`profile-input w-full outline-0 p-1.5 ${errors.x && 'text-red-500'}`} type="url" name="x" id="x" placeholder='X URL' {...register('x')} />
                        </div>

                    </div>

                    <button disabled={isLoading} type="submit" className="my-2 py-2 px-3 rounded-full bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5 hover:bg-indigo-900 transition duration-200 cursor-pointer" >{isLoading ? <span className='loader'></span> : "Submit"}</button>

                </form>

            </div>

        </div>
    )
}

export default ProfileEdit