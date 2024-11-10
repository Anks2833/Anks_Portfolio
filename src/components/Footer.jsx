import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (


        <div className="w-full h-[20vh] flex justify-between items-center text-white mt-52 px-20">

            <div className="flex items-center gap-8">
                <h1
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    LINKEDIN
                </h1>

                <h1
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    GITHUB
                </h1>

                <h1
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    INSTAGRAM
                </h1>

                <h1>DESIGNED AND BUILT BY ANKUR</h1>
            </div>

            <div>
                <h1>©{currentYear}</h1>
            </div>

        </div>

    )
}

export default Footer