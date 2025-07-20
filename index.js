const express  = require("express");
const { createTodo } = require("./types");
const { todo } = require("node:test");
const { title } = require("process");
const app = express(); 

app.use(express.json());

app.get("/todo",async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if( !parsedPayload.success){
        res.send(411).json({
            msg:"You have sent the wrong inputs"
        })
        return;
    }

    //put it in the mongodb


    await todo.create({
        title: createPayload.title,
        description:createPayload.description,
        completed: false
    })
    res.json({
        msg:"TODO created"
    })
})

app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    res.json({
        todos
    })
})

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
