import React, { useState } from 'react';
import Svg from './Svg';
import { profileDelete } from '../api/Profile';
import { useNavigate } from 'react-router';

const ProfileDelete = ({ setProfileDelModel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const AccountDelete = async() => {
        setIsLoading(true);
        await profileDelete();
        navigate('/login');
    };

    return (
        <div className=' absolute top-0 px-2 h-full w-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex items-center justify-center'>

            <div className='profile-delete relative w-md p-5 border border-red-500/20  bg-white/10 backdrop-blur-xs shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl'>
                {/* Header */}
                <div className=' flex items-center justify-between text-red-600'>
                    <h3 className=' bg-red-200 px-2 py-0.5 text-lg  font-semibold font-nanum rounded-md '>Account Removal</h3>
                </div>

                {/*Project fetch */}
                <p className='font-nanum text-[1.4em] text-red-700 px-2 py-2 '>Are you sure, you want to delete your account? This will permanently remove your account and all data.</p>

                <div className='flex items-center justify-end py-1.5'>
                    <button disabled={isLoading} onClick={() => setProfileDelModel(false)} className=' mr-5 px-3 py-1 bg-transparent text-red-900 shadow-xs/50 rounded-[6%_94%_3%_98%_/_97%_4%_99%_3%]  cursor-pointer'>Cancel</button>
                    <button disabled={isLoading} onClick={() => AccountDelete()} className=' flex items-center justify-center gap-1.5 mr-5 px-2 py-1 bg-red-500 text-white shadow-xs/50  rounded-[6%_94%_3%_98%_/_97%_4%_99%_3%]  cursor-pointer'><Svg name={ isLoading ? 'loading' : 'delete'} /> Delete Account</button>
                </div>
            </div>

        </div>
    )
}

export default ProfileDelete