import Icons from "./Icons"

export const Footer = () => {
  return (
    <div className=" absolute bottom-5 right-2 text-slate-500  group">
      <Icons name={"info"}/>
        <p className="invisible w-64 absolute bottom-1 right-9 text-center py-1 rounded-md shadow-lg font-doto font-extrabold bg-white transform duration-150 group-hover:visible group-focus:visible group-active:visible ">Made with ❤️ D9.Coder</p>
    </div>
  )
}
