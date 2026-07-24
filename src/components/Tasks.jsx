import { useState } from "react"
import Header from "./Header"

function Tasks() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState(["Fazer a janta", "Estudar"])

  function handleButtonClick() {
    setMessages([...messages, inputValue])
  }
  return (
    <div>
      <Header>
        <h1>Add a task</h1>
      </Header>

      <input
        className="input"
        type="text"
        placeholder="Create your task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button className="button" onClick={handleButtonClick}>
        Add Task
      </button>

      <div>
        <ul>
          {messages.map((message) => {
            return <li key={message}>{message}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Tasks
