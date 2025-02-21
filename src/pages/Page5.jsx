import Footer from "../components/Footer"
import ResumeComponent from "../components/ResumeComponent"


const Page5 = () => {
    return (

        <div id="contact" className='fixed bottom-0 z-[-1] w-full h-[80vh] text-white flex flex-col mt-[180vw]'>

            <div className="flex flex-col items-start px-20 leading-none">
                <h1 className="text-[12vw] italic">LET'S CONNECT</h1>
                <h1 className="text-[12vw] ml-[20vw] italic">WITH MY</h1>
                <h1 className="text-[12vw] ml-[40vw] italic">SOCIALS</h1>
            </div>

            <div className="absolute left-20 bottom-28">
                <ResumeComponent />
            </div>

            <Footer />

        </div>

    )
}

export default Page5