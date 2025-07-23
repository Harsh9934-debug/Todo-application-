export function Todos({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <div>
          <h1>{todo.title}</h1>
          <h5>{todo.description}</h5>
          <button>{todo.completed ? 'Completed' : 'Mark as completed'}</button>
        </div>
      ))}
    </div>
  )
}
