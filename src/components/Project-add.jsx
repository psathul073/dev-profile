import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Svg from './Svg';
import { FetchRepo } from '../api/FetchRepo';
import { UploadProject } from '../api/Project';

const ProjectAdd = ({ setProjectAddModel }) => {

  const { register: registerGh, handleSubmit: handleFetchSubmit, reset: resetGh } = useForm();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isPicture, setIsPicture] = useState(null);
  const[isMsg, setIsMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Add project.
    await UploadProject(newForm);
    setIsSubmitting(false);
    setProjectAddModel(false);
  };

  const handleChange = (e) => {

    const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5Mb in bytes
    const selectedIMG = e.target.files[0];

    if (!selectedIMG) return; // If no file selected.
    if (selectedIMG.size > MAX_FILE_SIZE) {
      setIsMsg('file size > 1.5Mb')
      return; // Set maximum size below 1.5Mb. 
    }

    setValue(e.target.id, selectedIMG); // Directly store  in the form
    setIsMsg(null);

    // Set image preview.
    const objURL = URL.createObjectURL(selectedIMG);
    setIsPicture(objURL);
  };

  return (
    <div className=' absolute top-0 px-2 w-full h-full backdrop-blur-sm bg-[rgba(255, 255, 255, 0.05)] flex items-center justify-center overflow-y-scroll scrollbar'>

      <div className=' profile-edit relative md:w-7/12 w-full h-fit p-5  bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgb(0,0,0,0.18)] rounded-xl'>
       
        {/* Header */}
        <div className=' flex items-center justify-between  text-amber-600'>
          <h3 className=' bg-amber-200 px-2 py-1 ml-5 text-lg  font-semibold font-nanum rounded-md ' >Add Project</h3>
          <button onClick={() => setProjectAddModel(false)} className=' text-2xl rounded-full p-1 bg-amber-200 cursor-pointer'> <Svg name={'X'} /></button>
        </div>
        
        {/*Project fetch */}
        <p className='font-nanum text-[1.4em] text-amber-700 px-2 py-3'>Fetch project from github.</p>
        <form className=' flex justify-between' onSubmit={ handleFetchSubmit(FetchRepos)}>
          <div className='w-full flex flex-wrap sm:flex-nowrap items-center gap-2'>
            <input className='w-full px-2 py-1 border-b-2 border-r border-dashed border-amber-600 focus:outline-0 ' type="text" name='ghUsername' placeholder='Github username' {...registerGh('ghUsername', { required: true })} />
            <input className='w-full px-2 py-1 border-b-2 border-l border-dashed border-amber-600 focus:outline-0 ' type="text" name='repoName' placeholder='Project name' {...registerGh('repoName', { required: true })} />
          </div>
          <button className='text-xl pl-4 text-amber-600 cursor-pointer' type="submit"><Svg name={loading ? 'loading' : 'pkSearch'} /></button>
        </form>

        {/* Project submit form */}
        <form className=' relative pt-2 md:py-6 h-full w-full flex flex-col md:flex-row justify-center item-center gap-5' onSubmit={handleSubmit(addProject)}>

          <div className='relative p-2 flex flex-col justify-center  items-center group transform duration-200'>
            <img src={isPicture ? isPicture : '/addImg.webp'} alt="Picture" className=' md:w-[240px] md:h-[240px] w-40 h-40 rounded-md p-1 inset-shadow-[0_0_5px_2px_rgb(251,191,36,0.2)] object-cover bg-center outline outline-dashed outline-amber-400' />
            <label htmlFor="picture" className='invisible absolute p-1 bg-amber-400 rounded-md flex justify-center items-center text-2xl text-shadow-white cursor-pointer backdrop-blur-xs group-hover:visible group-active:visible'> <Svg name={'camera'} className={"text-white"} /> </label>
            <input type="file" name="picture" id="picture" accept="image/png, image/jpeg" className=' hidden' onChange={handleChange}/>
          </div>

          <div className='relative md:w-[80%] flex flex-col gap-3 text-amber-950/90'>
            <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="text" placeholder='Project Title' { ...register('title', { required: true})} />
            <textarea className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="text" name="" id="" placeholder='Small description'{...register('description', { required: true })} ></textarea>
            <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="url" name="" id="" placeholder='Live link' {...register('liveURL')} />
            <input className='px-2 py-1 border-b-2  border-dashed border-amber-400 focus:outline-0' type="url" name="" id="" placeholder='Demo link' {...register('demoURL', { required: true })} />
            <button className='flex flex-row justify-center items-center bg-amber-400 text-amber-900 self-end mr-10 mt-5 w-[83px] h-[42px] py-2 px-4 rounded-[6%_94%_7%_93%_/_93%_5%_95%_7%] hover:bg-amber-200 active:bg-amber-200 cursor-pointer' type="submit">{ isSubmitting? <Svg name={'loading'}/> :' Submit' }</button>
            { isMsg && <p className='absolute bottom-4 text-red-500 animate-pulse'>{isMsg}</p>}
          </div>

        </form>

      </div>

    </div>
  )
}

export default ProjectAdd