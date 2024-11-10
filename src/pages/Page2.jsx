import AnimatedMarquee from "../components/AnimatedMarquee"


const Page2 = () => {
    return (
        <div id="about" className='relative w-full h-screen bg-[#0B0D0C] text-white pt-12 flex flex-col items-center gap-16'>


            <h1 className='page2-heading w-full flex justify-start pl-32 tracking-widest text-5xl'>DO YOU REALLY KNOW ME?</h1>

            <div className="w-full flex flex-col justify-start items-start pl-32 text-4xl">
                <p>I am Ankur Dubey, a self-taught Full-Stack</p>
                <p>Developer who constantly seeks out</p>
                <p> innovative solutions to everyday problems</p>
                <p> and enjoys creating things that live on the internet.</p>
                <p className="mt-24">Well-versed in numerous technologies including:</p>

                <div className="absolute left-0 bottom-36">
                    <AnimatedMarquee />
                </div>
            </div>

        </div>
    )
}

export default Page2