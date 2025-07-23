import { useEffect, useState } from 'react'
import './App.css'
import { CreateTodo } from '../components/CreateTodo'
import { Todos } from '../components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json()
        setTodos(json.todos)
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err)
      })
  }, []) 

  return (
  <div>
    <CreateTodo/>
    <Todos todos={[
      {
        title:"adfasdf",
        description:"afasdfasdfasdf",
        completed:false
      }
    ]}>
    </Todos>
  </div>
  )
}

export default App
