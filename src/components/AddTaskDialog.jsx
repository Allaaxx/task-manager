import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleTaskSubmit }) => {
  const [errors, setErrors] = useState([])

  const nodeRef = useRef(null)
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleCancel = () => {
    handleClose()
  }

  const handleSaveClick = () => {
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
      return
    }

    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Preencha todos os campos.")
    }

    handleTaskSubmit({
      id: v4(),
      title: title,
      time,
      description,
      status: "not_started",
    })
    handleClose()
  }

  const titleError = errors.find((error) => error.field === "title")
  const timeError = errors.find((error) => error.field === "time")
  const descriptionError = errors.find((error) => error.field === "description")
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
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
                insira as informações abaixo
              </p>
              <div className="flex w-84 flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Name"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect ref={timeRef} errorMessage={timeError?.message} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a Tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    variant="secondary"
                    className="w-full"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
