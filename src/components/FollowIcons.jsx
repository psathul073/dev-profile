import Follow from "./Follow"

const FollowIcons = () => {

  return (
    <div className=" w-full flex flex-row justify-center gap-9  py-5 ">
     <Follow text={"Github"} iconName={"github"} link={"https://github.com/psathul073"} />
     <Follow text={"Instagram"} iconName={"instagram"} link={"https://www.instagram.com/d9.coder"} />
     <Follow text={"Codepen"} iconName={"codepen"} link={"https://codepen.io/Athul369"} />
     <Follow text={"Gmail"} iconName={"gmail"} link={"mailto: psathul073@gmail.com"} />
    </div>
  )
  
}

export default FollowIcons