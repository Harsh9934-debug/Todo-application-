const express = require("express");
const { createTodo, updateTodo } = require("./types"); // Import updateTodo schema
const { Todo } = require("./db"); // Mongoose Todo model
const cors = require("cors");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS for all origins
app.use(cors());

// POST /todo - Create a new todo
app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        // Log validation errors for debugging
        console.error("Validation error for /todo:", parsedPayload.error.errors);
        return res.status(411).json({
            msg: "You have sent the wrong inputs",
            errors: parsedPayload.error.errors // Send detailed errors for debugging
        });
    }

    try {
        await Todo.create({
            title: parsedPayload.data.title, // Use parsedPayload.data
            description: parsedPayload.data.description, // Use parsedPayload.data
            completed: false // Default to false
        });
        res.json({
            msg: "TODO created"
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            msg: "Failed to create todo",
            error: error.message
        });
    }
});

// GET /todos - Get all todos
app.get("/todos", async function (req, res) {
  try {
    const todos = await Todo.find({}); // Fetch all todos
    res.json({ todos }); // Respond with an object containing the 'todos' array
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
        msg: "Failed to fetch todos",
        error: error.message
    });
  }
});

// POST /completed - Mark a todo as completed
app.post("/completed", async function (req, res) {
  const updatePayload = req.body; // The body should contain { id: "..." }
  const parsedPayload = updateTodo.safeParse(updatePayload); // Use the new updateTodo schema

  if (!parsedPayload.success) {
      console.error("Validation error for /completed:", parsedPayload.error.errors);
      return res.status(411).json({
          msg: "Invalid input for marking todo as completed",
          errors: parsedPayload.error.errors
      });
  }

  const { id } = parsedPayload.data; // Get the id from the parsed data

  try {
    const result = await Todo.updateOne(
      { _id: id }, // Find by MongoDB _id
      { completed: true } // Set completed to true
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Todo not found or already completed." });
    }

    res.json({
      msg: "Todo marked as completed"
    });
  } catch (err) {
    console.error("Error marking todo as completed:", err); // Log the actual error
    res.status(500).json({
      msg: "Something went wrong while updating the todo.",
      error: err.message
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});