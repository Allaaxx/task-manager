import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getContainerClasses = () => {
    if (task.status === "done") {
      return "bg-brand-magenta/10 text-brand-magenta"
    }

    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process"
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10 text-brand-dark-blue"
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === "done") {
      return "bg-brand-magenta text-white"
    }

    if (task.status === "in_progress") {
      return "bg-brand-process text-white"
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue/15 text-brand-dark-blue"
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
            <TrashIcon className="text-brand-text-gray" />
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
