const express  = require("express");
const { createTodo } = require("./types");
const app = express(); 

app.use(express.json());

app.get("/todo",function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if( !parsedPayload.success){
        res.send(411).json({
            msg:"You have sent the wrong inputs"
        })
        return;
    }

    //put it in the mongodb
})

app.get("/todos",function(req,res){
    

})

app.get("/completed",function(req,res){
    const updaatedPayload = req.body;
    const parsedPayload = createTodo.safeParse(updaatedPayload);
    if( !parsedPayload.success){
        res.send(411).json({
            msg:"You have sent the wrong inputs"
        })
        return;
    }

    //put it in the mongodb
})