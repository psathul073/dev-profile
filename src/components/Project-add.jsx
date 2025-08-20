import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Svg from './Svg';
import { FetchRepo } from '../api/FetchRepo';
import { UploadProject } from '../api/Project';
import { X } from 'lucide-react';
import MultiSelect from './MultiSelect';

const ProjectAdd = ({ setProjectAddModel }) => {

  const { register: registerGh, handleSubmit: handleFetchSubmit, reset: resetGh } = useForm();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isPicture, setIsPicture] = useState(null);
  const [isMsg, setIsMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState([]);

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
    { value: 'exJs', label: 'Express.js' },
    { value: 'threeJs', label: 'Three.js' },
    { value: 'pg', label: 'PostgreSQL' },
    { value: 'mdb', label: 'MongoDB' },
    { value: 'fb', label: 'Firebase' },
    { value: 'sqz', label: 'Sequelize' },
    { value: 'dk', label: 'Docker' },
    { value: 'bdr', label: 'Blender' },
    { value: 'cv', label: 'Canva' },
    { value: 'fm', label: 'Figma' },
    { value: 'vs', label: 'VS Code' },
    { value: 'ws', label: 'Websocket' },
    { value: 'cy', label: 'Cloudinary' },
  ];

  // Fetch github repos and add to form.
  const FetchRepos = async (data) => {
    setLoading(true);
    const repo = await FetchRepo(data);
    setLoading(false);
    resetGh({ ghUsername: '', repoName: '' });

    reset({
      title: repo?.name ?? null,
      description: repo?.description ?? null,
      liveURL: repo?.homepage ?? null,
      demoURL: repo?.html_url ?? null,
    })
  };

  // Save Project data.
  const addProject = async (formData) => {
    // console.log(formData, '--add');
    setIsSubmitting(true);
    const newForm = new FormData();

    Object.keys(formData).forEach((Keys) => {
      if (formData[Keys] instanceof FileList && formData[Keys].length > 0) {
        newForm.append(Keys, formData[Keys][0]);
      } else {
        newForm.append(Keys, formData[Keys]);
      }
    });

      newForm.append('usedTec', JSON.stringify(selected || []));
    // Add project.
    await UploadProject(newForm);
    setIsSubmitting(false);
    setProjectAddModel(false);
  };

  const handleChange = (e) => {

    const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes
    const allowedTypes = ['image/png', 'image/webp', 'image/jpeg'];
    const selectedIMG = e.target.files[0];
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

    setValue(e.target.id, selectedIMG); // Directly store  in the form
    setIsMsg(null);

    // Set image preview.
    const objURL = URL.createObjectURL(selectedIMG);
    setIsPicture(objURL);
  };

  return (

    <div className='z-20 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex max-sm:items-start items-center justify-center p-2.5 overflow-y-auto'>

      <div className=' profile-edit relative w-full max-w-[768px] h-fit p-3 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn '>

        {/* Header */}
        <div className=' flex items-center justify-between'>
          <h1 className='text-[19px] font-medium ' >Add Project</h1>
          <button onClick={() => setProjectAddModel(false)} className='rounded-full p-1.5 bg-indigo-200/10 hover:bg-indigo-200/20  cursor-pointer'> <X strokeWidth={1.5} /></button>
        </div>

        {/*Project fetch */}
        <p className='text-[15px] mb-4'>Fetch project from github.</p>

        <form className=' flex justify-between mb-4' onSubmit={handleFetchSubmit(FetchRepos)}>

          <div className='w-full flex flex-wrap sm:flex-nowrap items-center gap-4'>

            <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" name='ghUsername' placeholder='Github username' {...registerGh('ghUsername', { required: true })} />

            <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" name='repoName' placeholder='Project name' {...registerGh('repoName', { required: true })} />

            <button className=' max-sm:w-full flex justify-center items-center bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5 rounded-md hover:bg-indigo-800 cursor-pointer' type="submit"><Svg name={loading ? 'loading' : 'pkSearch'} /></button>

          </div>

        </form>

        {isMsg && <p className=' text-center text-red-400 animate-pulse'>{isMsg}</p>}

        {/* Project submit form */}
        <form className=' relative my-2 md:py-6 ' onSubmit={handleSubmit(addProject)}>

          <div className='h-full w-full flex flex-col md:flex-row gap-5 mt-5 max-sm:mt-15'>

            <div className='relative flex flex-col justify-center items-center mb-6 group transform duration-200'>
              <img src={isPicture ? isPicture : '/addImg.webp'} alt="Picture" className='w-[240px] h-[250px]  rounded-md p-1 object-scale-down bg-center p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' />
              <label htmlFor="picture" className='invisible absolute p-1 bg-indigo-900 rounded-md flex justify-center items-center text-2xl text-shadow-white cursor-pointer backdrop-blur-xs group-hover:visible group-active:visible'> <Svg name={'camera'} className={"text-white"} /> </label>
              <input type="file" name="picture" id="picture" accept="image/png, image/webp, image/jpeg" className=' hidden' onChange={handleChange} />
            </div>

            <div className='relative md:w-[80%] flex flex-col gap-3.5 '>
              <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" placeholder='Project Title' maxLength={'22'} {...register('title', { required: true })} />
              <textarea className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="text" name="" id="" placeholder='Small description' maxLength='260' {...register('description', { required: true })} ></textarea>
              <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="url" name="" id="" placeholder='Live link' {...register('liveURL')} />
              <input className='w-full p-2.5 rounded-md border border-indigo-200 outline-4 outline-indigo-200/15 ' type="url" name="" id="" placeholder='Demo link' {...register('demoURL', { required: true })} />

            </div>

          </div>

          <MultiSelect allOptions={allOptions} selected={selected} setSelected={setSelected} />

          <button disabled={isSubmitting} className=' relative left-1/2 -translate-x-1/2 mt-6 flex flex-row justify-center items-center py-2 px-3 rounded-full bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5 hover:bg-indigo-900 transition duration-200 cursor-pointer' type="submit">{isSubmitting ? <span className='loader'></span> : "Submit"}</button>

        </form>

      </div>

    </div>
  )
}

export default ProjectAdd