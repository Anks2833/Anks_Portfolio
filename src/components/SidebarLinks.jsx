import { BsArrowDownRight } from "react-icons/bs";

const SidebarLinks = () => {

    const socialData = [
        { id: "1", name: "LINKEDIN", icon: <BsArrowDownRight /> },
        { id: "1", name: "INSTAGRAM", icon: <BsArrowDownRight /> },
        { id: "1", name: "GITHUB", icon: <BsArrowDownRight /> },
    ]

    return (
        <>

            {socialData.map(item => {
                return (
                    <div key={item.id} className='h-1/3 bg-black text-white border flex flex-col justify-between items-center py-12 hover:translate-x-2 hover:translate-y-2 transition-all'>
                        <h1 className='rotate-90 text-lg'>{item.name}</h1>
                        <div>{item.icon}</div>
                    </div>
                )
            })}

        </>
    )
}

export default SidebarLinks