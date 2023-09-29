import React from 'react'
import { useNavigate } from 'react-router-dom'
import InstructorSchedule from '../components/instructorSchedule'
let user = JSON.parse(localStorage.getItem('user'))

const Instructor = () => {
  const Navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
    <div className='flex w-full justify-between'>
      <h1 className='font-semibold text-xl'>Welcome {user.userName}</h1>
      <div className='flex flex-col'>
        <button onClick={()=>{
        localStorage.removeItem('user')
        Navigate("/")
      }} className="m-4 font-medium bg-purple-600  hover:bg-purple-700 active:bg-purple-800 px-6 h-9 rounded-md text-white align-middle flex items-center">Logout</button>
        
      </div>
      

    </div>
    <InstructorSchedule/>
    </div>
  )
}

export default Instructor