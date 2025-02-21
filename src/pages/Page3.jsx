import Achievements from '../components/Achievements'

const Page3 = () => {
  return (
    <div id='achievements' className='relative w-full h-screen bg-[#0B0D0C] text-white flex flex-col items-start px-28 gap-16 pt-96'>
        
        <h1 className='exo-2-bold text-white text-8xl tracking-widest'>ACHIEVEMENTS.</h1>

        <Achievements />

    </div>
  )
}

export default Page3