import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Svg from './Svg';
import { FetchSingleProject } from '../api/FetchProjects';
import { UpdateProject } from '../api/Project';

const ProjectEdit = ({ projectID, setEditModel }) => {

    const { register, handleSubmit, reset, setValue } = useForm();
    const [picture, setPicture] = useState(null);
    const [isMsg, setIsMsg] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const navigate = useNavigate();

    const submit = async (data) => {
        setIsDisable(true);
        const newForm = new FormData();

        Object.keys(data).forEach((Keys) => {
            if (data[Keys] instanceof FileList && data[Keys].length > 0) {
                newForm.append(Keys, data[Keys][0]);
            } else {
                newForm.append(Keys, data[Keys]);
            }
        });

        await UpdateProject(newForm);
        setIsDisable(false);
        navigate(0);
    };

    // Handle file change.
    const handleFileChange = (event) => {
        const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes
        const selectedIMG = event.target.files[0];

        if (!selectedIMG) return; // If no file selected.
        if (selectedIMG.size > MAX_FILE_SIZE) {
            setIsMsg('file size > 1.5Mb')
            return; // Set maximum size below 1.5Mb. 
        }

        setValue(event.target.id, selectedIMG); // Directly store  in the form
        setIsMsg(null);

        // Set image preview.
        const objURL = URL.createObjectURL(selectedIMG);
        setPicture(objURL);
    };

    // Add existing project data.
    // Fetch a single project.
    useEffect(() => {
        // console.log(projectID, 'p id');

        const fetchProject = async () => {

            const project = await FetchSingleProject(projectID);

            reset({
                picture: project?.picture ?? null,
                pictureID: project?.pictureID ?? null,
                projectID: projectID,
                title: project?.title ?? null,
                description: project?.description ?? null,
                liveURL: project?.liveURL ?? null,
                demoURL: project?.demoURL ?? null,
            });

            setPicture(project?.picture);
        };

        fetchProject();

    }, []);

    return (
        <div className=' absolute top-0 px-2 h-full w-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex items-center justify-center'>

            <div className='project-edit relative md:w-7/12 w-full p-5  bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl'>
                {/* Header */}
                <div className=' flex items-center justify-between text-amber-600'>
                    <h3 className=' bg-amber-200 px-2 py-0.5 ml-5 text-lg  font-semibold font-nanum rounded-md '>Edit Project</h3>
                    <button onClick={() => setEditModel(false)} className=' text-2xl rounded-full p-1 bg-amber-200 cursor-pointer'> <Svg name={'X'} /></button>
                </div>


                {/* Project submit form */}
                <form onSubmit={handleSubmit(submit)} className='py-6 flex justify-center flex-wrap sm:flex-nowrap gap-5' >

                    <div className='relative p-2 flex flex-col justify-center items-center group transform duration-200'>
                        <img src={picture ? picture : '/addImg.webp'} alt="Picture" className='w-44 h-44 md:w-80 md:h-60  rounded-md object-scale-down bg-center outline-1 outline-dashed outline-amber-500' />
                        <label htmlFor="picture" className='invisible absolute p-1 rounded-md flex justify-center items-center text-2xl text-shadow-white cursor-pointer bg-amber-400 backdrop-blur-xs group-hover:visible group-active:visible'> <Svg name={'camera'} className={"text-white"} /> </label>
                        <input type="file" name="picture" id="picture" accept="image/png, image/jpeg" className=' hidden' onChange={handleFileChange} />
                    </div>

                    <div className='relative w-full flex flex-col gap-3 text-amber-900/60'>
                        <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="text" placeholder='Project Title' {...register('title', { required: true })} />
                        <textarea className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="text" name="" id="" placeholder='Small description' maxLength={'260'} {...register('description', { required: true })} ></textarea>
                        <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="url" name="" id="" placeholder='Live link' {...register('liveURL')} />
                        <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="url" name="" id="" placeholder='Demo link' {...register('demoURL', { required: true })} />
                        <input type="text" name="projectID" id="projectID" hidden {...register('projectID')} />
                        <input type="text" name='pictureID' id='pictureID' hidden {...register('pictureID')} />
                        <button disabled={isDisable} className='flex flex-row justify-center items-center bg-amber-400 text-amber-900 self-end mr-10 mt-5 w-[83px] h-[42px] py-2 px-4 rounded-[6%_94%_7%_93%_/_93%_5%_95%_7%] hover:bg-amber-200 active:bg-amber-200 cursor-pointer' type="submit">{ isDisable ? <Svg name={'loading'}/> :'Update'}</button>
                        {isMsg && <p className='absolute bottom-4 text-red-500 animate-pulse'>{isMsg}</p>}
                    </div>

                </form>

            </div>

        </div>
    )
}

export default ProjectEdit