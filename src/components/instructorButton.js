import React from 'react'

const InstructorButton = ({instructor,selectedInstructor,setSelectedInstructor,selectedDate}) => {
  if(!selectedDate) return
    let newDate = new Date(selectedDate)
  let nonAvailableDates = instructor.datesScheduled
  console.log(instructor)
    return (
    <button disabled={!ifDatesAvailable(newDate,nonAvailableDates)} onClick={()=>setSelectedInstructor(instructor._id)} className={`w-48 h-20 flex flex-col align-middle justify-center items-center cursor-pointer ${selectedInstructor==instructor._id?"border-2 border-black":""} ${ifDatesAvailable(newDate,nonAvailableDates)?"":"opacity-30" }`}>
        <h1 className='font-semibold text-lg'>{instructor.userName}</h1>
        <h1>{instructor.email}</h1>

    </button>
  )
}



function ifDatesAvailable(newDate,nonAvailableDates){
  console.log(newDate,nonAvailableDates)
    for(let x =0;x<nonAvailableDates.length;x++){
        let currDate = new Date(nonAvailableDates[x]);
        if(currDate.toDateString()===newDate.toDateString())return false
    }
    return true

}

export default InstructorButton