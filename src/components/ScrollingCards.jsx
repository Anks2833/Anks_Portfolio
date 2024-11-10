import { GoArrowUpRight } from "react-icons/go";
import { handleMouseEnterBig, handleMouseLeave } from '../utils/CursorEffects';
import { NavLink } from "react-router-dom";

const ScrollingCards = () => {
    const cardData = [
        {
            id: "1",
            title: "POKEINFO-THE POKEDEX",
            description: "PokeInfo is a comprehensive and searchable Pokémon database that provides detailed insights into species, abilities, types, and evolutions. It features a responsive design for desktop and mobile, supported by a RESTful API for seamless data interactions.",
            link: "https://project-pokeinfo.vercel.app/",
            image: "../poke.png"
        },
        {
            id: "2",
            title: "CODEKARO-THE CODE EDITOR",
            description: "CodeKaro is a versatile code editor with support for multiple programming languages, real-time code execution, and syntax highlighting. It offers a responsive interface, collaborative features, and a RESTful API for efficient code management and sharing.",
            link: "",
            image: "../codekaro.png"
        },
        {
            id: "3",
            title: "BAATCHEET-THE CHAT APP",
            description: "BaatCheet is a video conferencing app that enables seamless real-time communication with features like screen sharing, chat, and meeting scheduling. It provides a responsive, user-friendly interface with secure connections, supporting collaborative virtual meetings across devices.",
            link: "https://project-baat-cheet.vercel.app/",
            image: "../baat.png"
        },
    ];

    return (
        <>
            {cardData.map((dat) => {
                return (
                    <div
                        key={dat.id}
                        className='relative w-[25vw] h-[32vw] rounded-2xl overflow-hidden group'
                        onMouseEnter={handleMouseEnterBig}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={dat.image} alt={dat.title} className="w-full h-full object-cover" />

                        {/* Content container that will show on hover */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-transparent group-hover:bg-[#BFFF00] transition-all duration-300">
                            <div className="absolute inset-0 flex flex-col justify-center items-start text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NavLink to={`${dat.link}`} target="_blank" className="absolute -top-4 -right-4 w-28 h-28 border-2 border-black rounded-full hover:bg-white transition-all flex items-center justify-center">
                                    <GoArrowUpRight className="text-black text-5xl" />
                                </NavLink>
                                <h1 className="font-bold text-2xl text-black mt-14 px-10">{dat.title}</h1>
                                <p className="text-black mt-6 leading-8 font-light px-10">{dat.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ScrollingCards;