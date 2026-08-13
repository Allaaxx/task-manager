import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

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
      reset(data)
    }
    fetchTasks()
  }, [taskId, reset])

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      )
    }

    toast.success("Tarefa deletada com sucesso")
    handleBackClick()
  }

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    })

    if (!response.ok) {
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      )
    }

    const updatedTask = await response.json()

    setTask(updatedTask)
    toast.success("Tarefa atualizada com sucesso!")
    handleBackClick()
  }

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
            disabled={isSubmitting}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefa */}
          <div key={task?.id} className="space-y-6 rounded-xl bg-white p-6">
            <div>
              <Input
                id="title"
                label="Titúlo"
                disabled={isSubmitting}
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio"
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                disabled={isSubmitting}
                {...register("time", {
                  required: "O horário é obrigatório.",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                disabled={isSubmitting}
                {...register("description", {
                  required: "A descrição é obrigátoria",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode ser vazia"
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
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
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && (
                <LoaderIcon className="animate-spin text-brand-white" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
