import { generateApiKey } from '../api/Profile';
import { useState } from 'react';

const APIDoc = () => {

    const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || null);

    const GenerateApiKey = async () => {
        setApiKey(null);
        const result = await generateApiKey();
        if (result.success) setApiKey(result.apiKey);
        localStorage.setItem('apiKey', result.apiKey);
    };


    const exampleCode = `
fetch("https://dev-profile-92gb.onrender.com/api/projects?limit=10", {
  headers: { 
    "x-api-key": "YOUR_GENERATED_API_KEY"
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err)); `

    return (
        <div className=" h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex justify-center p-3 max-sm:p-2.5 overflow-y-auto scroll-smooth">
        
            <div className="relative h-fit w-full max-w-[1024px] p-3.5 bg-indigo-50/5 text-neutral-900 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins">

                <h1 className="font-bold text-xl mb-6">API Document</h1>

                <div className='flex items-center flex-wrap gap-5 mb-4'>
                    <p className=' text-base font-semibold'>API KEY :</p>  <p className=' bg-indigo-900/20 p-2 rounded-md dark:text-indigo-500 text-indigo-600'> {apiKey} </p>

                    <button className='py-2 px-3 rounded-full bg-indigo-950 text-indigo-50 border border-indigo-200 outline-4 outline-indigo-200/15 p-2.5 hover:bg-indigo-900 active:bg-indigo-900 transition duration-200 cursor-pointer' onClick={() => GenerateApiKey()}>Generate API Key</button>
                </div>

                <br /> <hr className="text-indigo-900/20" />

                <h1 className="font-bold mt-5 mb-2">Using the API</h1>

                <p className='mb-3'>To access the Projects API, you must include your API Key in the request header.
                    You can generate your API key here.</p>

                <p className='font-semibold mb-4'>Base URL</p>
                <pre className='flex flex-wrap'>
                    <code className='text-wrap bg-indigo-900/20 p-3 rounded '>
                        https://dev-profile-92gb.onrender.com/api
                    </code>
                </pre>

                <br /> <hr className="text-indigo-900/20" />

                <h1 className="font-bold mt-5 mb-4" >Example: Fetch All Projects</h1>
                <pre className='flex flex-wrap mb-4'>
                    <code className='text-wrap bg-indigo-900/20 p-3 rounded max-[324px]:text-[13px]'>
                        {exampleCode}
                    </code>
                </pre>

                <p><strong>limit :</strong> Number of projects to return (default 10)</p>

                <br /> <hr className="text-indigo-900/20" />

                <h1 className="font-bold mt-5 mb-4">Headers</h1>

                <table className='w-full max-[375px]:text-[13px] mb-4'>
                    <thead className='text-center'>
                        <tr>
                            <th className=' border p-1.5'>Header</th>
                            <th className=' border p-1.5'>Type</th>
                            <th className=' border p-1.5'>Required</th>
                            <th className=' border p-1.5'>Description</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        <tr>
                            <td className=' border p-1.5'>`x-api-key`</td>
                            <td className=' border p-1.5'>string</td>
                            <td className=' border p-1.5'>Yes</td>
                            <td className=' border p-1.5'>Your unique API key.</td>
                        </tr>
                    </tbody>
                </table>
            
                <br /> <hr className="text-indigo-900/20" />

                <h1 className='font-bold mt-5 mb-4' >Rate Limits</h1>

                <table className='w-full max-[375px]:text-[13px] mb-4'>
                    <thead className='text-center'>
                        <tr className=''>
                            <th className='border p-1.5'>Plan</th>
                            <th className='border p-1.5' >Requests / Day</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        <tr>
                            <td className='border p-1.5'>Free</td>
                            <td className='border p-1.5' >100</td>
                        </tr>
                    </tbody>
                </table>

                <p className='font-semibold mb-4'>If you exceed your daily quota, you’ll receive: </p>
                <pre className='flex flex-wrap mb-4'>
                    <code className='text-wrap bg-indigo-900/20 text-red-400 p-3 rounded '>
                        error: "API rate limit exceeded for today."
                    </code>
                </pre>
            </div>

        </div >
    )
}

export default APIDoc