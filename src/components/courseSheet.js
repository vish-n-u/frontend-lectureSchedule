import React, { useState } from "react";
import { createCourse } from "../url";
const user = JSON.parse(localStorage.getItem("user"))

function CourseSheet({setIsNewCourseSheetOpen}) {
  const [course, setCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: null, // Use null for file input
    lectures: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;

    setCourse({
      ...course,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call handleSave to handle the submission
    handleSave(course,setIsNewCourseSheetOpen);
  };

  return (
    <div className="w-[95%] h-[95%] absolute top-3 left-3 shadow-black p-4 bg-white z-10 shadow-lg">
     <h1 onClick={()=>setIsNewCourseSheetOpen(false)} className="w-full cursor-pointer text-right font-bold text-xl ">X</h1>
     <h1 className="w-full text-center font-bold text-xl">New Course</h1>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={course.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-gray-600">
            Level
          </label>
          <input
            type="text"
            id="level"
            name="level"
            value={course.level}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-600">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" // Allow only image file types
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Add lectures input here */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

async function handleSave(course,setIsNewCourseSheetOpen) {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log("user",user)
    let imageData = null; // Initialize imageData

    if (course.image) {
      // Use FileReader to convert the image into binary data
      const reader = new FileReader();

      reader.onload = async (e) => {
        imageData = e.target.result;

        // After reading, send the course data including the image data
        try {
          const newCourse = await fetch(createCourse, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify({
              name: course.name,
              description: course.description,
              level: course.level,
              image: imageData,
              token: user.token// Send image data as-is
            }),
          });

          if (newCourse.ok) {
            console.log("Course created successfully.", newCourse);
            alert("Course created successfully")
            setIsNewCourseSheetOpen(false)
            // Reset the form or handle success as needed
          } else {
            console.error("Failed to create course.");
            alert("Failed to create course. Please retry.");
          }
        } catch (error) {
          console.error("Error creating course:", error);
          alert("Error creating course. Please retry.");
        }
      };

      reader.readAsDataURL(course.image); // Read the image as data URL
    }
  } catch (e) {
    console.error(e);
    alert("Please retry...");
  }
}

export default CourseSheet;


