import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'

const CourseButton = ({course,setSelectedCourse,selectedCourse}) => {
    const  [image,setImageUrl] = useState()
    const [isMoreInfoClicked,setIsMoreInfoClicked] = useState(false)
    console.log(course.image)
    let imageBuffer = course.image.data
    useEffect(() => {
      if (imageBuffer) {
        // Create a Blob from the imageBuffer
        const blob = new Blob([new Uint8Array(imageBuffer)], { type: 'image/jpeg' });
  
        // Use FileReader to read the Blob as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    }, [imageBuffer]);
    console.log("image",image)
  
  return (
    <div onClick={()=>{if(setSelectedCourse)setSelectedCourse(course._id)}} className={`w-48 h-20 flex align-middle items-center justify-around cursor-pointer ${selectedCourse==course._id?"border-2 border-black":""}`}>
        <img src={image} alt="courseImage" className='w-10 h-10 rounded-full'/>
        <h1 className='font-semibold text-lg'>{course.name}</h1>
        <FontAwesomeIcon icon={faCircleInfo} className='z-20' onClick={()=>setIsMoreInfoClicked(true)}/>
     {isMoreInfoClicked&& <ShowCourseDetail course={course} setIsMoreInfoClicked={setIsMoreInfoClicked}/>}
    </div>
  )
}

function ShowCourseDetail ({course,setIsMoreInfoClicked}){
      return (
        <div className='w-screen h-screen absolute z-30 top-10 left-10 p-4'>
         
        <div className='w-[80%] h-[60%] absolute p-8 bg-white shadow-xl shadow-black'>
        <div className='w-full text-right flex justify-end'>
          <h1 onClick={()=>setIsMoreInfoClicked(false)} className='text-2xl font-bold px-2 rounded-full bg-black text-white cursor-pointer'>X</h1>
          </div>
          <div className='w-full flex justify-center flex-col items-center'>
          <h1 className='font-semibold text-lg'>Course Name :{"      "}{course.name}</h1>
          <h1 className='font-semibold text-lg'>Course Level :{"    "+course.level}</h1>
          <h1 className='font-semibold text-lg'>{"Description   :   "+course.description}</h1>
        </div>
        </div>
        </div>
      )
}

export default CourseButton
