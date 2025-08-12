
const ConfirmModel = ({title, content, confirm, cancel, loading}) => {
  return (
      <div className=' z-50 fixed top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex items-center justify-center p-2.5'>

          <div className='relative w-md p-3.5 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins animate-popIn'>
              {/* Header */}
    
                  <h1 className=' text-lg font-medium mb-4'>{title}</h1>


              {/*Project fetch */}
              <p className='text-[15px] mb-4'>{content}</p>

              <div className='flex items-center justify-end gap-2 py-1.5'>
                  <button disabled={loading} onClick={() => cancel()} className=' mr-5 p-2 border border-indigo-900/30 bg-indigo-800/10 text-indigo-800 rounded-full hover:bg-indigo-800/20 cursor-pointer'>Cancel</button>
                  <button disabled={loading} onClick={() => confirm()} className=' flex items-center justify-center gap-1.5 mr-5 p-2 rounded-full border border-red-900/30 bg-red-800/10 text-red-800 hover:bg-red-800/20 cursor-pointer'>{ loading ? <span className='loader'></span> : "Delete" }</button>
              </div>
          </div>

      </div>
  )
}

export default ConfirmModel