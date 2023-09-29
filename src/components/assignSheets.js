import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { createNewScheduleUrl, getAllCoursesUrl, getAllInstructorsUrl } from '../url'
import CourseButton from './courseButton';
import InstructorButton from './instructorButton';

const AssignSheet = ({setIsAssignSheetOpen}) => {
  const [allCourses,setAllCourses] = useState([])
  const [allInstructors,setAllInstructor] = useState([])
  const [selectedDate,setSelectedDate] = useState();
  const [selectedCourse,setSelectedCourse] = useState("")
  const [selectedInstructor,setSelectedInstructor] = useState("")
  
  useEffect(()=>{
    getData(setAllCourses,setAllInstructor,setIsAssignSheetOpen)
  },[])
  return (
    <div className='w-[95%] h-[95%] absolute top-5 left-5 z-10 bg-white shadow-xl shadow-black p-3'>
        <div className='flex flex-col w-full items-center'> 
        <div className='w-full flex justify-end'>
          <h1 onClick={()=>setIsAssignSheetOpen(false)} className='bg-black cursor-pointer text-white px-3 rounded-full'>X</h1>
        </div>
        <div className='w-full text-center my-8 flex justify-center'>
          <h1 className='mx-4 text-lg font-semibold'>Select a Date!</h1>
        <DatePicker className='mx-4 text-lg font-semibold border-2 border-black' disabled={selectedCourse?false:true} selected={selectedDate} minDate={new Date()} onChange={(date) => setSelectedDate(date)} />
        </div>
        <div className='flex '>
        <div className='mx-4'>
            <div className='flex flex-col'>
              <h1>List of Courses</h1>
              <div className='flex flex-col overflow-auto border border-black w-72 items-center h-96 p-2'>
                {
                  allCourses.map(course=>{
                    return <h1 key={course._id}>
                      <CourseButton course={course} setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse}/>
                    </h1>
                  })
                }
              </div>
            </div>
        </div>
        <div>
            <h1>List of Instructors</h1>
            <div className='flex flex-col overflow-auto border border-black w-72 items-center h-96 p-2'>
                {
                  allInstructors.map(instructor=>{
                    return <InstructorButton instructor={instructor} selectedInstructor={selectedInstructor} setSelectedInstructor={setSelectedInstructor} selectedDate={selectedDate}/>
                  })
                }
              </div>
        </div>
        </div>
        <h1>{!selectedCourse?"Please Select a course you want to assign!":!selectedDate?"Please Select a date":!selectedInstructor?"Please select an Instructor you want to assign this course":""}</h1>
        <button
        onClick={()=>handleSave(selectedDate,selectedInstructor,selectedCourse,setIsAssignSheetOpen)}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded my-8 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
    </div>
  )
}

async function getData(setAllCourses,setAllInstructor,){
  let user = JSON.parse(localStorage.getItem('user'));
  try{
    let allCourses = await fetch(getAllCoursesUrl,{
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({token:user.token})
    })
    let allCoursesJson =await allCourses.json()
    let allInstructors = await fetch(getAllInstructorsUrl,{
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({token:user.token})
    })
    let allInstructorsJson =await allInstructors.json()
    if(allCourses.status === 200)
    setAllCourses(allCoursesJson.message)
    if(allInstructors.status === 200)
    setAllInstructor(allInstructorsJson.message)
    
    
  }
  catch(e){
    console.log(e)
    return
  }

}


async function handleSave(selectedDate,selectedInstructor,selectedCourse,setIsAssignSheetOpen){
  if(!selectedDate) return alert("Please select a date")
  if(!selectedInstructor) return alert("Please select an Instructor")
  if(!selectedCourse) return alert("Please select a course")
  console.log("------",selectedDate,selectedInstructor,selectedCourse,"-------")
try{
  const user = JSON.parse(localStorage.getItem("user"))
const newschedule = await fetch(createNewScheduleUrl,{
  method:"POST",
  mode:"cors",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({
    date:selectedDate,
    instructorId:selectedInstructor,
    courseId:selectedCourse,
    token:user.token
  })
})
const newScheduleJson = await newschedule.json()
console.log(newScheduleJson)
if(newschedule.status==201||newschedule.status==200){
  alert("Successfully Assigned")
  setIsAssignSheetOpen(false)

}

}
catch(err){
  console.log(err)
  alert("Error , please retry")
}

}


export default AssignSheet