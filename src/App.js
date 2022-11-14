import React, { useEffect } from 'react'
import './App.css';
import Todo from './components/Todo'
import { v4 as uuidv4 } from 'uuid'

export const TodoContext = React.createContext()
const LOCAL_STORAGE_KEY = 'super_secret_key'

function App() {
  const [todos, setTodos] = React.useState(() => {
    const todoJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(todoJSON == null) {
      return defaultTodos
    } else {
      return JSON.parse(todoJSON)
    }   ///Found this on stack overflow, this will keep the state even if the page is refreshed
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleTodoDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleTodoTextChange(id, newValue) {
    const newTodos = [...todos]
    const index = todos.findIndex(item => item.id === id)
    newTodos[index] = {...newTodos[index], content: newValue}
    setTodos(newTodos)
  }

  function handleTodoChecked(id, newValue) {
    const newTodos = [...todos]
    const index = todos.findIndex(item => item.id === id)
    newTodos[index] = {...newTodos[index], checked: newValue}
    setTodos(newTodos)
  }

  const handlesContext = {handleTodoDelete, handleTodoTextChange, handleTodoChecked}

  function handleTodoAdd(newValue) {
    if(newValue !== ""){
      const newTodo = {
        id:uuidv4(),
        content: newValue,
        checked:false
      }
      setTodos([...todos, newTodo])
      document.getElementById("inputForm").value = ""
    }
  }

  function handleTodoAddKeyPress(e) {
    if(e.keyCode === 13){
      handleTodoAdd(e.target.value)
    }
  }

  const todoList = todos.map(todo => {
    return(
      <Todo key={todo.id} id={todo.id} content={todo.content} checked={todo.checked}/>
      )
    })

  return (
    <TodoContext.Provider value={handlesContext}>
      <div className="appContainer">
        <div className="title">
          <h1>Todo List</h1>
          <input id="inputForm" onKeyUp={(e) => handleTodoAddKeyPress(e)} className="inputForm--text" type="text" placeholder="Enter Item Here"></input>
          <button onClick={() => handleTodoAdd(document.getElementById("inputForm").value)} className="inputForm--button">Add</button>
        </div>
        <div className="listContainer">
          {todoList}
        </div>
      </div>
    </TodoContext.Provider>
  )
}

const defaultTodos = [
  {
    id:uuidv4(),
    checked: false,
    content: "Buy groceries"
  },
  {
    id:uuidv4(),
    checked:false,
    content: "Walk dog"
  },
  {
    id:uuidv4(),
    checked:false,
    content: "Pay bills"
  },
  {
    id:uuidv4(),
    checked:true,
    content:"Complete coding dojo Assignment"
  }
]

export default App;