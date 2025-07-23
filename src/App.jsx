import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from '../components/CreateTodo';
import { Todos } from '../components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  // Function to fetch todos from the backend
  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos); // Assuming backend sends { todos: [...] }
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
        // Optionally, handle error state for UI
      });
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this runs once after initial render

  // Function to handle marking a todo as completed
  const handleMarkAsCompleted = (id) => {
    fetch("http://localhost:3000/completed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
    .then(async (res) => {
      if (res.ok) {
        // If the update was successful, re-fetch todos to update the UI
        fetchTodos();
        alert("Todo marked as completed!"); // Simple feedback
      } else {
        const errorData = await res.json();
        alert(`Failed to mark todo as completed: ${errorData.msg || res.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error marking todo as completed:", err);
      alert("An error occurred while updating the todo.");
    });
  };

  return (
    <div>
      <CreateTodo onTodoCreated={fetchTodos} /> {/* Pass fetchTodos to CreateTodo to refresh list */}
      <Todos todos={todos} onMarkAsCompleted={handleMarkAsCompleted} />
    </div>
  );
}

export default App;