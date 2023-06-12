import React, { useState, useEffect } from "react"
import axios from "axios"
import Wallpaper from "../assets/rec.png"
import Refresh from "../assets/refresh.png"
import Footer from "./footer"
import { useParams, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const EditTask = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [taskName, setTaskName] = useState("")

  useEffect(() => {
    console.log("Task Id:", taskId)
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/${taskId}`
        )
        setTaskName(response.data.name)
      } catch (error) {
        console.log("Error fetching task:", error)
      }
    }

    fetchTask()
  }, [taskId])

  const handleUpdateTask = async (e) => {
    e.preventDefault()

    console.log("Updating task...")

    try {
      await axios.patch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
        name: taskName,
      })
      toast.success("Task updated successfully!")

      // navigate("/")
    } catch (error) {
      console.log("Error updating task:", error)
    }
  }

  // const handleCancelEdit = () => {
  //   navigate("/")
  // }

  return (
    <>
      <ToastContainer />
      <div className="font-['poppins']">
        <div className="flex my-5 justify-center">
          <p className="font-bold text-[50px] text-[#007FDB]">Edit Task</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white h-[240px] w-[350px] shadow-lg shadow-indigo-500/40">
            <img src={Wallpaper} className="h-[180px]" alt="nature" />

            <div className="mx-[13px] mt-3">
              <form onSubmit={handleUpdateTask}>
                <div className="flex">
                  <input
                    type="text"
                    id="task"
                    className="block p-2 text-[#888888] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-300  h-[40px] w-[250px]"
                    placeholder={taskName}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button type="submit" className="focus:outline-none">
                    <img
                      src={Refresh}
                      className="h-[30px] hover:border-green-400 rounded-xl shadow-lg border-x-4 border-y-4 bg-gray-100  shadow-indigo-500/20 bg-opacity-10 w-[30px] mx-2 my-[-2px]"
                      alt="Refresh"
                    />
                  </button>
                </div>
              </form>
              {/* </form> */}

              {/* Tasks */}
              <div className="flex mt-7 bg-white  border-2 border-gray-500 h-[70px] w-[330] hover:border-hidden rounded-xl shadow-lg shadow-indigo-500/20">
                <div className="flex space-x-4 mx-auto mt-3">
                  <button
                    onClick={() => navigate(`/`)} // Assuming you have imported 'useNavigate' as  'navigate'
                    className="focus:outline-none"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[300px]"></div>

      <>
        <Footer />
      </>
    </>
  )
}

export default EditTask
