import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([])
  const [savingLoading, setSavingLoading] = useState(false)

  const nodeRef = useRef(null)
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleCancel = () => {
    handleClose()
  }

  const handleSaveClick = async () => {
    setSavingLoading(true)
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
      return setSavingLoading(false)
    }

    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Preencha todos os campos.")
    }

    const task = {
      title,
      time,
      description,
      status: "not_started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      setSavingLoading(false)
      onSubmitError()
    }

    const createdTask = await response.json()

    onSubmitSuccess(createdTask)
    setSavingLoading(false)
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
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-brand-text-gray">
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
                    color="secondary"
                    className="w-full"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={savingLoading}
                  >
                    {savingLoading ? (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    ) : (
                      "Salvar"
                    )}
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}

export default AddTaskDialog
