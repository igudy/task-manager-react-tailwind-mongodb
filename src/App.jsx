import { useState } from "react"
import Todo from "./components/todo"
import Footer from "./components/footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditTask from "./components/edit"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
