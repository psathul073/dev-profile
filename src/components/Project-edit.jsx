import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Svg from './Svg';
import { FetchSingleProject } from '../api/FetchProjects';
import { UpdateProject } from '../api/Project';
import { X } from 'lucide-react';
import MultiSelect from './MultiSelect';
import { useAuth } from '../contexts/AuthContext'

const ProjectEdit = ({ projectID, setEditModel }) => {

    const { register, handleSubmit, reset, setValue } = useForm();
    const [picture, setPicture] = useState(null);
    const [isMsg, setIsMsg] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [selected, setSelected] = useState([]);
    const { user } = useAuth();

    const allOptions = [
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'tw', label: 'Tailwindcss.' },
        { value: 'bt', label: 'Bootstrap' },
        { value: 'sass', label: 'Sass' },
        { value: 'react', label: 'React' },
        { value: 'nx', label: 'Next.js' },
        { value: 'rq', label: 'React Query' },
        { value: 'rr', label: 'React Router' },
        { value: 'rhf', label: 'React Hook Form.' },
        { value: 'axios', label: 'Axios' },
        { value: 'git', label: 'Git' },
        { value: 'gh', label: 'Github' },
        { value: 'npm', label: 'NPM' },
        { value: 'nodeJs', label: 'Node.js' },
        { value: 'ex', label: 'Express.js' },
        { value: '3', label: 'Three.js' },
        { value: 'pg', label: 'PostgreSQL' },
        { value: 'mdb', label: 'MongoDB' },
        { value: 'fb', label: 'Firebase' },
        { value: 'sqz', label: 'Sequelize' },
        { value: 'dk', label: 'Docker' },
        { value: 'bdr', label: 'Blender' },
        { value: 'cv', label: 'Canva' },
        { value: 'fm', label: 'Figma' },
        { value: 'vs', label: 'VS Code' },
    ];
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

        if (selected.length) {
            newForm.append('usedTec', JSON.stringify(selected) || []);
        }

        localStorage.removeItem(`projects-${user?.name}`);
        localStorage.removeItem(`cursor-${user?.name}`);

        await UpdateProject(newForm);

        setIsDisable(false);
        navigate(0);
    };

    // Handle file change.
    const handleFileChange = (event) => {
        setIsMsg('');
        const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes.
        const allowedTypes = ['image/png', 'image/webp', 'image/jpeg'];
        const selectedIMG = event.target.files[0];
        const invalidFile = !allowedTypes.includes(selectedIMG.type);

        if (!selectedIMG) return; // If no file selected.
        if (selectedIMG.size > MAX_FILE_SIZE) {
            setIsMsg('file size > 1.5Mb')
            return; // Set maximum size below 1.5Mb. 
        }
        if (invalidFile) {
            setIsMsg('Invalid file type!');
            return;
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
            setSelected(project?.usedTec ?? []);
        };

        fetchProject();

    }, []);

    return (
        <div className=' z-30 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex max-sm:items-start items-center justify-center p-2.5 overflow-y-auto'>

            <div className='project-edit relative w-full max-w-[768px] p-3.5 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn'>

                {/* Header */}
                <div className=' flex items-center justify-between mb-4'>
                    <h3 className=' text-lg font-medium '>Edit Project</h3>
                    <button onClick={() => setEditModel(false)} className=' rounded-full p-1.5 bg-indigo-200/10 hover:bg-indigo-200/20  cursor-pointer'> <X strokeWidth={1.5} /></button>
                </div>


                {/* Project submit form */}
                <form onSubmit={handleSubmit(submit)} >

                    <div className=' flex justify-center flex-wrap sm:flex-nowrap gap-5 md:mb-2.5'>

                        <div className='relative flex flex-col justify-center items-center group transform duration-200'>
                            <img src={picture ? picture : '/addImg.webp'} alt="Picture" className='w-[240px] h-[250px]  rounded-md p-1 object-scale-down bg-center p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15' />
                            <label htmlFor="picture" className='invisible absolute p-1 rounded-md flex justify-center items-center text-2xl text-shadow-white cursor-pointer bg-indigo-900 backdrop-blur-xs group-hover:visible group-active:visible transition'> <Svg name={'camera'} className={"text-white"} /> </label>
                            <input type="file" name="picture" id="picture" accept="image/png, image/webp, image/jpeg" className=' hidden' onChange={handleFileChange} />
                        </div>

                        <div className='relative w-full flex flex-col gap-3.5'>

                            <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" placeholder='Project Title' {...register('title', { required: true })} />
                            <textarea className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" name="" id="" placeholder='Small description' maxLength={'260'} {...register('description', { required: true })} ></textarea>
                            <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="url" name="" id="" placeholder='Live link' {...register('liveURL')} />
                            <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="url" name="" id="" placeholder='Demo link' {...register('demoURL', { required: true })} />
                            <input type="text" name="projectID" id="projectID" hidden {...register('projectID')} />
                            <input type="text" name='pictureID' id='pictureID' hidden {...register('pictureID')} />

                        </div>

                    </div>

                    {isMsg && <p className=' text-center my-2 text-red-400 '>{isMsg}</p>}

                    <MultiSelect allOptions={allOptions} selected={selected} setSelected={setSelected} />

                    <button disabled={isDisable} className=' relative left-1/2 -translate-x-1/2 mt-6 flex flex-row justify-center items-center py-2 px-3 rounded-full bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5  hover:bg-indigo-900 transition duration-200 cursor-pointer' type="submit">{isDisable ? <span className='loader'></span> : 'Update'}</button>

                </form>

            </div>

        </div>
    )
}

export default ProjectEdit