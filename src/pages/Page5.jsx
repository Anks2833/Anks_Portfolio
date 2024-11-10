import Footer from "../components/Footer"
import ResumeComponent from "../components/ResumeComponent"


const Page5 = () => {
    return (

        <div id="contact" className='relative w-full h-screen text-white flex flex-col pt-20'>

            <div className="flex flex-col items-start px-20 leading-none">
                <h1 className="text-[8vw] italic">LET'S CONNECT</h1>
                <h1 className="text-[8vw] ml-[20vw] italic">WITH MY</h1>
                <h1 className="text-[8vw] ml-[40vw] italic">SOCIALS</h1>
            </div>

            <div className="absolute left-20 bottom-40">
                <ResumeComponent />
            </div>

            <Footer />

        </div>

    )
}

export default Page5