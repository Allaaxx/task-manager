import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTasks()
  }, [taskId])

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

    toast.success("Tarefa deletada com sucesso")
    setDeleteIsLoading(false)
    handleBackClick()
  }

  const handleUpdateClick = async () => {
    setSaveIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        field: "title",
        message: "O título é obrigatório",
      })
    }

    if (!time.trim()) {
      newErrors.push({
        field: "time",
        message: "O horário é obrigatório",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        field: "description",
        message: "A descrição é obrigatória",
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }

    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Preencha todos os campos.")
    }

    const task = {
      title,
      time,
      description,
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      )
    }

    const updatedTask = await response.json()

    setTask(updatedTask)
    toast.success("Tarefa atualizada com sucesso!")
    setSaveIsLoading(false)
    handleBackClick()
  }
  const titleError = errors.find((error) => error.field === "title")
  const timeError = errors.find((error) => error.field === "time")
  const descriptionError = errors.find((error) => error.field === "description")

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do top */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-magenta"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-magenta">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <LoaderIcon className="animate-spin text-brand-white" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <div key={task?.id} className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <Input
              id="title"
              label="Titúlo"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={saveIsLoading}
            />
          </div>
          <div>
            <TimeSelect
              ref={timeRef}
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              disabled={saveIsLoading}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={saveIsLoading}
            />
          </div>
        </div>
        {/* botões */}
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary" onClick={handleBackClick}>
            Cancelar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleUpdateClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && (
              <LoaderIcon className="animate-spin text-brand-white" />
            )}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
