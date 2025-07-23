const express  = require("express");
const { createTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors")
const { todo } = require("node:test");
const { title } = require("process");
const app = express(); 
app.use(cors());


app.use(express.json());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You have sent the wrong inputs"
        });
        return;
    }

    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({
        msg: "TODO created"
    });
});

app.get("/todos", async function (req, res) {
  const todos = await Todo.find({});
  res.json({ todos });
});


app.get("/completed",async function(req,res){
    const updaatedPayload = req.body;
    const parsedPayload = createTodo.safeParse(updaatedPayload);
    if( !parsedPayload.success){
        res.send(411).json({
            msg:"You have sent the wrong inputs"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"Todo mark has been updated "
    })
})

app.post("/completed", async function (req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "ID is required" });
  }

  try {
    await Todo.updateOne({ _id: id }, { completed: true });

    res.json({
      msg: "Todo marked as completed"
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});