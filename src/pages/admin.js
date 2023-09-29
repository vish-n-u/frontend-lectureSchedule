import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseSheet from '../components/courseSheet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import AssignSheet from '../components/assignSheets'
let user = localStorage.getItem('user')

const Admin = () => {
  const [isNewCourseSheetOpen,setIsNewCourseSheetOpen] = useState(false) 
  const [isAssignSheetOpen,setIsAssignSheetOpen] = useState(false)
  const Navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
    <div className='flex w-full justify-between'>
      <h1>Welcome {user.userName}</h1>
      <div className='flex flex-col'>
        <button onClick={()=>{
        localStorage.removeItem('user')
        Navigate("/")
      }} className="m-4 font-medium bg-purple-600  hover:bg-purple-700 active:bg-purple-800 px-6 h-9 rounded-md text-white align-middle flex items-center">Logout</button>
        
      </div>


    </div>
    <div  className='w-full items-center flex-col flex justify-center'>
      <FontAwesomeIcon onClick={()=>setIsNewCourseSheetOpen(true)} icon={faFileCirclePlus} size="2xl" className='cursor-pointer'/>
      <h1>Add new Course</h1>
      </div>
<div className='w-full items-center flex-col flex justify-center mt-10'>
<FontAwesomeIcon onClick={()=>setIsAssignSheetOpen(true)} icon={faUser} size='2xl' className='cursor-pointer'/>
<h1>Assign instructor to course</h1>

</div>
    {isNewCourseSheetOpen&&<CourseSheet setIsNewCourseSheetOpen={setIsNewCourseSheetOpen}/>}
    {isAssignSheetOpen&&<AssignSheet setIsAssignSheetOpen={setIsAssignSheetOpen}/>}
    </div>
  )
}
export default Admin