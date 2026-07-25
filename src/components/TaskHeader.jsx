import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"

const TaskHeader = () => {
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

        <Button>
          <AddIcon />
          Nova Tarefa
        </Button>
      </div>
    </div>
  )
}

export default TaskHeader
