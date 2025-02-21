import Project1 from "./projects/Project1"
import Project2 from "./projects/Project2";
import Project3 from "./projects/Project3";
import Project4 from "./projects/Project4";
import Project5 from "./projects/Project5";
import Project6 from "./projects/Project6";
import { FaArrowLeftLong } from "react-icons/fa6";

const ScrollingCards = () => {

    return (
        <div className="flex flex-col gap-52">
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-12">
                    <Project1 />
                    <div className="mt-60">
                        <Project2 />
                    </div>
                </div>

                <div className="relative w-96 h-96 rounded-full border ml-32 -rotate-90">
                    <FaArrowLeftLong
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl"
                        style={{ stroke: "white", strokeWidth: "2" }}
                    />
                </div>
            </div>

            <div className="flex items-start justify-between">
                <div className="relative w-96 h-96 rounded-full border rotate-[220deg]">
                    <FaArrowLeftLong
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl"
                        style={{ stroke: "white", strokeWidth: "2" }}
                    />
                </div>

                <div className="flex items-center gap-12">
                    <div className="mt-60">
                        <Project3 />
                    </div>
                    <Project4 />
                </div>
            </div>

            <div className="flex items-start justify-center gap-12">
                <div className="mt-80">
                    <Project5 />
                </div>

                <div className="relative w-96 h-96 rounded-full border -rotate-90">
                    <FaArrowLeftLong
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl"
                        style={{ stroke: "white", strokeWidth: "2" }}
                    />
                </div>

                <Project6 />
            </div>
        </div>
    );
}

export default ScrollingCards;