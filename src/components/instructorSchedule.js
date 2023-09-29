import React, { useEffect, useState } from 'react'
import { getInstructorScheduleUrl } from '../url'
import CourseButton from "./courseButton"

const InstructorSchedule = () => {
  const [schedules,setSchedule] = useState([])
  useEffect(()=>{
    getData(setSchedule)
  },[])
  return (
    <div className='w-[90%] max-h-[90%] flex justify-center'>
    <table className="table-auto w-[50%] h-auto border-2 border-black">
      <thead className='border-b-2 border-t-2 border-black'>
        <tr>
          <th className='border-r-2 border-black'>Courses</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          schedules?.assignedSchedules?.map((schedule)=>{
            return <tr>
            <td className='border-r-2 border-b-2 border-black'><CourseButton course={schedule.courseId}/></td>
            <td className='border-b-2 border-black'>{new Date(schedule.date).toDateString()}</td>
            </tr>
          })
        }

      </tbody>
    </table>
    </div>
  )
}

async function getData(setSchedule){
  try{
    const user = JSON.parse(localStorage.getItem('user'))
let allSchedule = await fetch(getInstructorScheduleUrl,{
  method:"POST",
  mode:"cors",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({token:user.token})
}
)
let allScheduleJson = await allSchedule.json()
setSchedule(allScheduleJson.message)
console.log(allScheduleJson.message)

  }
  catch(err){
    console.log(err)
    return alert("Server error: " )
  }
}

export default InstructorSchedule