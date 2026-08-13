import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import { tv } from "tailwind-variants"

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const taskItem = tv({
  slots: {
    container:
      "flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition",
    checkbox:
      "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors",
  },
  variants: {
    status: {
      done: {
        container: "bg-brand-magenta/10 text-brand-magenta",
        checkbox: "bg-brand-magenta text-white",
      },
      in_progress: {
        container: "bg-brand-process/10 text-brand-process",
        checkbox: "bg-brand-process text-white",
      },
      not_started: {
        container: "bg-brand-dark-blue/10 text-brand-dark-blue",
        checkbox: "bg-brand-dark-blue/15 text-brand-dark-blue",
      },
    },
  },
})

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  const { container, checkbox } = taskItem({ status: task.status })

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      )
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
  }

  return (
    <div className={container()}>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className={checkbox()}>
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
          <Button
            color="ghost"
            onClick={handleDeleteClick}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <LoaderIcon className="h-4 w-4 animate-spin text-brand-text-gray" />
            ) : (
              <TrashIcon className="text-brand-text-gray" />
            )}
          </Button>

          <Link
            to={`/tasks/${task.id}`}
            className="hover: opacity-75 transition-colors"
          >
            <DetailsIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
}

export default TaskItem
