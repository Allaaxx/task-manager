import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

const TaskHeader = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text text-xs font-semibold text-pink-500">
          Minhas Tarefas
        </span>
        <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost">
          <TrashIcon />
          Limpar tarefas
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          <AddIcon />
          Nova Tarefa
        </Button>
        <AddTaskDialog isOpen={addTaskDialogIsOpen} />
      </div>
    </div>
  )
}

export default TaskHeader
