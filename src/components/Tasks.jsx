import TaskHeader from "./TaskHeader"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <TaskHeader />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <SunIcon />
            <p className="text-[#9a9c9f]">Manhã</p>
          </div>
        </div>

        <div className="my-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <CloudSunIcon />
            <p className="text-[#9a9c9f]">Tarde</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <MoonIcon />
            <p className="text-[#9a9c9f]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Tasks
