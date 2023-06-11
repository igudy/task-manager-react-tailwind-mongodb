import React from "react"
import { getYear } from "date-fns"

const footer = () => {
  const today = new Date()
  const currentYear = getYear(today)

  return (
    <div>
      <div className="font-[poppins] p-4 text-center bg-slate-900">
        <p className="text-white">© {currentYear} </p>
        <a className="text-white" href="https://twiiter.com/iigudy">
          Igudy (IG THE CODE SLINGER)
        </a>
      </div>
    </div>
  )
}

export default footer
