import React from 'react';

export function Todos({ todos, onMarkAsCompleted }) {
  const containerStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px',
    fontSize: '2em',
  };

  const todoItemStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '15px 20px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Space between elements
  };

  const titleStyle = {
    margin: '0',
    color: '#2c3e50',
    fontSize: '1.5em',
  };

  const descriptionStyle = {
    margin: '0',
    color: '#666',
    fontSize: '1em',
    lineHeight: '1.5',
  };

  const buttonBaseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, opacity 0.3s ease',
    alignSelf: 'flex-start', // Align button to start
  };

  const completedButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#28a745', // Green for completed
  };

  const markAsCompletedButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#007bff', // Blue for "Mark as Completed"
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
  };

  const noTodosStyle = {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '30px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Your Todos</h2>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo._id} style={todoItemStyle}>
            <h3 style={titleStyle}>{todo.title}</h3>
            <p style={descriptionStyle}>{todo.description}</p>
            <button
              onClick={() => {
                if (!todo.completed) {
                  onMarkAsCompleted(todo._id);
                }
              }}
              style={todo.completed ? completedButtonStyle : markAsCompletedButtonStyle}
              disabled={todo.completed}
            >
              {todo.completed ? 'Completed' : 'Mark as Completed'}
            </button>
          </div>
        ))
      ) : (
        <p style={noTodosStyle}>No todos found. Add some!</p>
      )}
    </div>
  );
}