import { generateApiKey } from "../api/Profile";
import { useCallback, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import Svg from "../components/Svg";
import { useToast } from "d9-toast";

const APIDocPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("apiKey") || null
  );
  const { showToast } = useToast();

  const GenerateApiKey = useCallback(async () => {
    setIsGenerating(true);
    try {
      const result = await generateApiKey();
      if (result?.type === "success") {
        setApiKey(result.apiKey);
        localStorage.setItem("apiKey", result.apiKey);
      }
      showToast({
        title: false,
        type: result?.type || "success",
        message: "API key is generated successfully.",
        className: "dark:!bg-gray-800 dark:!text-white",
        duration: 3000,
      });
    } catch (error) {
      console.error("API key generation failed: ", error);
      showToast({
        title: false,
        type: "error",
        message: "API key generation failed",
        className: "dark:!bg-gray-800 dark:!text-white",
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  }, [showToast]);

  const exampleCode = `
fetch("https://dev-profile-qd3u.onrender.com/api/projects?limit=10", {
  headers: { 
    "x-api-key": "YOUR_GENERATED_API_KEY"
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err)); `;

  return (
    <SidebarLayout>
      <div className="relative h-full px-4 md:px-6 w-full max-w-7xl mx-auto bg-white dark:bg-black text-gray-700 dark:text-gray-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 py-2.5 flex items-center justify-between bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <h2 className="text-lg">API Document</h2>
        </div>
        {/* API key generation */}
        <div className="flex items-center max-sm:justify-center flex-wrap gap-5 my-6">
          <p className=" text-base font-semibold">API KEY : </p>
          <p className=" w-90 h-12 text-wrap bg-gray-100 dark:bg-gray-900 p-3 text-sm/6 rounded-md dark:text-green-500 text-green-700">
            {apiKey}
          </p>
          <button
            disabled={isGenerating}
            aria-label="API key Generation Button"
            className="py-2 px-3 flex justify-center items-center gap-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            onClick={() => GenerateApiKey()}
          >
            {isGenerating ? (
              <>
                <Svg name={"loading"} /> Generating
              </>
            ) : (
              "Generate API Key"
            )}
          </button>
        </div>
        <br /> <hr className="text-gray-200 dark:text-gray-800" />
        <h2 className="font-semibold mt-5 mb-2">Using the API</h2>
        <p className="mb-3">
          To access the Projects API, you must include your API Key in the
          request header. You can generate your API key here.
        </p>
        <p className="font-semibold mb-4">Base URL</p>
        <pre className="flex flex-wrap">
          <code className="text-wrap bg-gray-100 dark:bg-gray-900 p-6 text-sm/6 rounded-md ">
            https://dev-profile-qd3u.onrender.com/api
          </code>
        </pre>
        <br /> <hr className="text-gray-200 dark:text-gray-800" />
        <h2 className="font-semibold mt-5 mb-4">
          Example : Fetch All Projects
        </h2>
        <pre className="flex flex-wrap mb-4">
          <code className="text-wrap bg-gray-100 dark:bg-gray-900 p-6 text-sm/6 rounded-md max-[324px]:text-[13px]">
            {exampleCode}
          </code>
        </pre>
        <p>
          <strong>Limit :</strong> Number of projects to return (default 10)
        </p>
        <br /> <hr className="text-gray-200 dark:text-gray-800" />
        {/* Table 1 */}
        <h2 className="font-semibold mt-5 mb-4">Headers</h2>
        <table className="w-full max-[375px]:text-[13px] mb-4 ">
          <thead className="text-center">
            <tr>
              <th className=" border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Header
              </th>
              <th className=" border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Type
              </th>
              <th className=" border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Required
              </th>
              <th className=" border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Description
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            <tr>
              <td className=" border border-gray-400 dark:border-gray-800 p-1.5">
                `x-api-key`
              </td>
              <td className=" border border-gray-400 dark:border-gray-800 p-1.5">
                string
              </td>
              <td className=" border border-gray-400 dark:border-gray-800 p-1.5">
                Yes
              </td>
              <td className=" border border-gray-400 dark:border-gray-800 p-1.5">
                Your unique API key.
              </td>
            </tr>
          </tbody>
        </table>
        {/* Table 2 */}
        <br /> <hr className="text-gray-200 dark:text-gray-800" />
        <h2 className="font-semibold mt-5 mb-4">Rate Limits</h2>
        <table className="w-full max-[375px]:text-[13px] mb-4">
          <thead className="text-center">
            <tr>
              <th className="border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Plan
              </th>
              <th className="border border-gray-400 dark:border-gray-800 p-1.5 font-medium">
                Requests / Day
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            <tr>
              <td className="border border-gray-400 dark:border-gray-800 p-1.5">
                Free
              </td>
              <td className="border border-gray-400 dark:border-gray-800 p-1.5">
                100
              </td>
            </tr>
          </tbody>
        </table>
        {/* Error response */}
        <h3 className="font-semibold mb-4">
          If you exceed your daily quota, you’ll receive:
        </h3>
        <pre className="flex flex-wrap mb-4">
          <code className="text-wrap bg-gray-100 dark:bg-gray-900 text-sm text-red-700 dark:text-red-400 p-6 rounded-md ">
            error : "API rate limit exceeded for today."
          </code>
        </pre>
      </div>
    </SidebarLayout>
  );
};

export default APIDocPage;
