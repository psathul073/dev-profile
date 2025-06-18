import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FetchUser } from '../api/Auth'
import { useNavigate } from 'react-router';
import { profileUpdates } from '../api/Profile';
import Svg from './Svg';

const ProfileEdit = ({ setProfileModel }) => {

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

        const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes
        const selectedIMG = e.target.files[0];

        if (!selectedIMG) return; // If no file selected.
        if (selectedIMG.size > MAX_FILE_SIZE) {
            setMsg('file size > 1.5Mb')
            return; // Set maximum size below 1.5Mb. 
        }

        setValue(e.target.id, selectedIMG); // Directly store  in the form
        setMsg(null);

        // Set image preview.
        const objURL = URL.createObjectURL(selectedIMG);
        setAvatar(objURL);
    };

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
                setProfileModel(false);
            };
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [setProfileModel]);

    return (
        <div className=' absolute top-0 h-full w-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex items-center justify-center'>

            <div ref={profileRef} className='profile-edit  relative w-96 py-10 px-5  bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl '>
                <h3 className='absolute left-4 top-4  bg-red-200 px-1.5 py-0.5 text-lg text-red-400 font-semibold font-nanum rounded-md'>Profile Edit</h3>
                <button onClick={() => setProfileModel(false)} className=' absolute top-4 right-4 text-2xl text-red-500 rounded-full p-1 bg-red-200 cursor-pointer'> <Svg name={'X'} /></button>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='relative p-2 flex flex-col justify-center items-center group transform duration-200'>
                        <img src={avatar ? avatar : user?.avatar} alt="avatar" className=' w-40 h-40 rounded-full object-scale-down bg-center outline-3 outline-red-400' loading='lazy' />
                        <label htmlFor="avatar" className='invisible absolute h-40 w-40  rounded-full flex justify-center items-center text-2xl text-shadow-white cursor-pointer bg-transparent backdrop-blur-xs group-hover:visible group-active:visible'> <Svg name={'camera'} className={"text-white"} /> </label>
                        <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg" className=' hidden' onChange={handleChange} />
                    </div>

                    <div className=' flex flex-col gap-2 my-5  text-red-400 '>
                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'verifyUser'}></Svg>
                            <input className={`profile-input ${errors.name ? 'text-red-500' : 'text-gray-700'}`} type="text" name="name" id="name" placeholder='Username'{...register('name')} />
                        </div>

                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'gh'}></Svg>
                            <input className={`profile-input ${errors.gh ? 'text-red-500' : 'text-gray-700'}`} type="url" name="gh" id="gh" placeholder='Github URL' {...register('gh', { required: true, })} />
                        </div>

                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'ig'}></Svg>
                            <input className={`profile-input ${errors.ig ? 'text-red-500' : 'text-gray-700'}`} type="url" name="ig" id="ig" placeholder='Instagram URL' {...register('ig', { required: true })} />
                        </div>

                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'yt'}></Svg>
                            <input className={`profile-input ${errors.yt ? 'text-red-500' : 'text-gray-700'}`} type="url" name="yt" id="yt" placeholder='Youtube URL' {...register('yt')} />
                        </div>

                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'lk'}></Svg>
                            <input className={`profile-input ${errors.lk ? 'text-red-500' : 'text-gray-700'}`} type="url" name="lk" id="lk" placeholder='Linkedin URL' {...register('lk', { required: true })} />
                        </div>
                        <div className='flex items-center gap-1.5 w-full  border-b-2 border-dashed'>
                            <Svg name={'x'} ></Svg>
                            <input className={`profile-input ${errors.x ? 'text-red-500' : 'text-gray-700'}`} type="url" name="x" id="x" placeholder='X URL' {...register('x')} />
                        </div>

                    </div>
                    
                    <div className=' flex items-center gap-5 '>
                        <button disabled={isLoading} className={`${isLoading ? 'bg-red-200' : 'bg-red-400'}  py-1 px-2 w-[67px] h-[34px] ml-10 text-white  rounded-[91%_9%_96%_4%_/_9%_94%_6%_91%]  cursor-pointer `} type="submit">Submit</button>
                        {isLoading && <p className='text-red-800 animate-pulse'>Submitting...</p>}
                        {msg && <p className='text-red-600 animate-pulse'>{msg}</p>}
                    </div>

                </form>

            </div>

        </div>
    )
}

export default ProfileEdit