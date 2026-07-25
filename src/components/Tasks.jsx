import { useState } from "react"
import TaskHeader from "./TaskHeader"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import TasksSeparator from "./TasksSeparator"
import TASKS from "../constants/tasks"
import TaskItem from "./TaskItem"

const Tasks = () => {
  const [tasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === "morning")

  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")

  const eveningTasks = tasks.filter((task) => task.time === "evening")
  return (
    <div className="w-full px-8 py-16">
      <TaskHeader />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Tasks
