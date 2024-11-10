import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';
import { CiFileOn } from "react-icons/ci";

const ResumeComponent = () => {
  return (

    <div
      className='w-[20vw] h-[4vw] border border-white flex justify-between items-center px-10'
    >

      <div className="w-fit h-full flex items-center pr-8 text-white text-2xl border-r border-r-white">
        <CiFileOn />
      </div>

      <h1
        className="text-2xl mr-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        RESUME
      </h1>

    </div>

  )
}

export default ResumeComponent