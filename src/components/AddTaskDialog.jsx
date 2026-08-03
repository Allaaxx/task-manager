import { createPortal } from "react-dom"

import Button from "./Button"
import Input from "./Input"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
          insira as informações abaixo
        </p>
        <div className="flex w-84 flex-col space-y-4">
          <Input id="title" label="Título" placeholder="Name" />
          <Input id="time" label="Horário" placeholder="Horário" />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a Tarefa"
          />
          <div className="flex gap-3">
            <Button
              size="large"
              variant="secondary"
              className="w-full"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
