import React, { useState } from 'react';

export function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(async (res) => {
      if (res.ok) {
        alert("Todo added!");
        setTitle(''); // Clear input fields
        setDescription('');
        if (onTodoCreated) {
          onTodoCreated(); // Call the callback to refresh the list in App.jsx
        }
      } else {
        const errorData = await res.json();
        alert(`Failed to add todo: ${errorData.msg || res.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error adding todo:", err);
      alert("An error occurred while adding the todo.");
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', marginBottom: '20px' }}>
      <h2>Create a New Todo</h2>
      <input
        style={{ padding: '8px', margin: '5px', width: '200px' }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <input
        style={{ padding: '8px', margin: '5px', width: '200px' }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <button
        style={{ padding: '10px 20px', margin: '10px 5px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
  }