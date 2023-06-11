import React, { useState, useEffect } from "react"
import axios from "axios"
import Wallpaper from "../assets/rec.png"
import Add from "../assets/add-button.png"
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png"
import { format, getDay, getTime } from "date-fns"
import Footer from "./footer"

const todo = () => {
  const [currentTime, setCurrentTime] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [taskName, setTaskName] = useState("")

  // Get functionality
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(false)
      setError(null)

      try {
        const response = await axios.get("http://localhost:3000/api/v1/tasks")
        setTasks(response?.data?.tasks)
        // console.log(response.data)
        setLoading(false)
      } catch (error) {
        setError("Error fetching users")
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(format(now, "h:mm a"))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const today = new Date()
  const formattedDate = format(today, "MMMM d, yyyy")
  const secondFormattedDate = format(today, "MMMM d")
  const dayOfWeek = format(today, "EEEE")

  // Post/Create functionality
  const handleAddTask = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post("http://localhost:3000/api/v1/tasks", {
        name: taskName,
      })

      setTaskName("")
      setTasks([...tasks, response?.data?.task])
      window.location.reload()
      //   setTasks((prevTasks) => [...prevTasks, response?.data?.task])
    } catch (error) {
      setError("Error adding task")
    } finally {
      setLoading(false)
    }
  }

  // Delete functionality
  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true)
      setError(null)

      await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`)

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    } catch (error) {
      setError("Error deleting task")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="font-['poppins']">
        <div className="flex my-5 justify-center">
          <p className="font-bold text-[50px] text-[#007FDB]">Todo</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white h-[240px] w-[350px] shadow-lg shadow-indigo-500/40">
            <img src={Wallpaper} className="h-[180px]" alt="nature" />

            <div className="text-white px-3 text-right my-[-90px]">
              <p>{dayOfWeek}</p>
              <p>{formattedDate}</p>
              <p className="text-[40px] font-extrabold my-[-10px]">
                {currentTime}
              </p>
            </div>
            <div className="my-[90px]"></div>
            <div className="mx-[13px] mt-5">
              {/* <div className="flex mt-6">
                <input
                  type="text"
                  id="task"
                  className="block p-2 text-[#888888] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-300  h-[40px] w-[250px]"
                  placeholder="Add Task"
                />
                <img
                  src={Add}
                  className="h-[45px] width-[45px] mx-2 my-[-2px]"
                  alt="nature"
                />
              </div> */}

              {/* Chat gpt doings */}
              <form onSubmit={handleAddTask}>
                <div className="flex mt-6">
                  <input
                    type="text"
                    id="task"
                    className="block p-2 text-[#888888] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-300  h-[40px] w-[250px]"
                    placeholder="Add Task"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="focus:outline-none"
                  >
                    <img
                      src={Add}
                      className="h-[45px] width-[45px] mx-2 my-[-2px]"
                      alt="nature"
                    />
                  </button>
                </div>
              </form>

              {/* Tasks */}
              {tasks.map((task) => (
                <div
                  className="flex mt-7 bg-white  border-2 border-gray-500 h-[70px] w-[330] hover:border-hidden rounded-xl shadow-lg shadow-indigo-500/20"
                  key={task?._id}
                >
                  <div className="mt-3 px-3">
                    <p className="text-black-300">{task?.name}</p>
                    <p className="text-gray-500 font-light text-[12px]">
                      {dayOfWeek} {secondFormattedDate}
                    </p>
                  </div>

                  <div className="flex space-x-4 mx-auto mt-3">
                    <img
                      src={Edit}
                      className="h-[20px] width-[20px]"
                      alt="nature"
                    />
                    <img
                      src={Delete}
                      className="h-[20px] width-[20px]"
                      alt="nature"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1000px]"></div>

      <>
        <Footer />
      </>
    </>
  )
}

export default todo
