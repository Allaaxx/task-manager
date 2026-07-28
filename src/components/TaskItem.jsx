import CheckIcon from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import Button from "./Button"

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getContainerClasses = () => {
    if (task.status === "done") {
      return "bg-pink-500/10 text-pink-500"
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04]/10 text-[#FFAA04]"
    }

    if (task.status === "not_started") {
      return "bg-[#35383E]/10 text-[#35383E]"
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === "done") {
      return "bg-pink-500 text-white"
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04] text-white"
    }

    if (task.status === "not_started") {
      return "bg-[#35383E]/15 text-[#35383E]"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getContainerClasses()}`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label
            className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors ${getCheckboxClasses()}`}
          >
            <input
              type="checkbox"
              checked={task.status === "done"}
              className="absolute h-full w-full cursor-pointer opacity-0"
              onChange={() => handleCheckboxClick(task.id)}
            />
            {task.status === "done" && <CheckIcon className="h-4 w-4" />}
            {task.status === "in_progress" && (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            )}
          </label>

          {task.title}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => handleDeleteClick(task.id)}>
            <TrashIcon className="text-[#9A9C9F]" />
          </Button>

          <a href="#" className="hover: opacity-75 transition-colors">
            <DetailsIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
