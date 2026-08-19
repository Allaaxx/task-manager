import "./AddTaskDialog.css"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error()
      }
      return response.json()
    },
  })

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const nodeRef = useRef(null)

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }
    mutate(task, {
      onSuccess: (savedTask) => {
        queryClient.setQueryData(["tasks"], (oldTasks) => {
          return [...oldTasks, savedTask]
        })
        handleClose()
        reset({
          title: "",
          time: "morning",
          description: "",
        })
      },
      onError: () => toast.error("error ao adcionar tarefa"),
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <form
              onSubmit={handleSubmit(handleSaveClick)}
              className="rounded-xl bg-white p-5 text-center shadow"
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-brand-text-gray">
                insira as informações abaixo
              </p>
              <div className="flex w-84 flex-col space-y-4">
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

                <TimeSelect
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horário é obrigatório.",
                  })}
                  errorMessage={errors?.time?.message}
                />

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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    size="large"
                    color="secondary"
                    className="w-full"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}

export default AddTaskDialog
