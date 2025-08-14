import { Link } from 'react-router'

const CheckBox = ({ isChecked, setIsChecked, setMessage }) => {
    return (

        <div className="inline-flex items-center mb-4">
            <label className="flex items-center cursor-pointer relative" htmlFor="check-with-link">
                <input type="checkbox"
                    checked={isChecked}
                    onChange={() => { setIsChecked(!isChecked); setMessage('') }}
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-indigo-200 checked:bg-indigo-800 checked:border-indigo-800"
                    id="check-with-link" />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                    </svg>
                </span>
            </label>
            <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-with-link">
                <p>
                    I agree with the

                    <Link to={"/terms-conditions"}className=" ml-1 font-medium hover:text-blue-500/80 underline">
                         terms and conditions
                    </Link>
                    .
                </p>
            </label>
        </div>
    )
}

export default CheckBox