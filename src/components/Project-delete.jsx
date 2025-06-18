import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Svg from './Svg';
import { DeleteProject } from '../api/Project';

const ProjectDelete = ({ projectID, setDeleteModel, pictureID }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const deleteProject = async() => {
        setIsLoading(true);
        await DeleteProject(projectID, pictureID);
        navigate(0);
    };

    return (
        <div className=' absolute top-0 px-2 h-full w-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex items-center justify-center'>

            <div className='profile-delete relative w-md p-5 border border-red-500/20 bg-white/10 backdrop-blur-xs shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl'>
                {/* Header */}
                <div className=' flex items-center justify-between text-red-600'>
                    <h3 className=' bg-amber-200 px-2 py-0.5 text-lg  font-semibold font-nanum rounded-md '>Delete Project</h3>
                    <button disabled={isLoading} onClick={() => setDeleteModel(false)} className=' text-2xl rounded-full p-1 bg-amber-200 cursor-pointer'> <Svg name={'X'} /></button>
                </div>

                {/*Project fetch */}
                <p className='font-nanum text-[1.4em] text-red-700 px-2 py-2 '>Are you sure, you want to delete this project ?.</p>

                <div className='flex items-center justify-end'>
                    <button disabled={isLoading} onClick={() => setDeleteModel(false)} className=' mr-5 px-3 py-0.5 bg-amber-100 text-amber-900 shadow-xs/50 rounded-[6%_94%_3%_98%_/_97%_4%_99%_3%]  cursor-pointer'>Cancel</button>
                    <button disabled={isLoading} onClick={() => deleteProject()} className=' flex items-center justify-center gap-1.5 mr-5 px-2 py-0.5 bg-red-500 text-white shadow-xs/50  rounded-[6%_94%_3%_98%_/_97%_4%_99%_3%]  cursor-pointer'><Svg name={isLoading ? 'loading' :'delete'}/> Delete</button>
                </div>
            </div>

        </div>
    )
}

export default ProjectDelete