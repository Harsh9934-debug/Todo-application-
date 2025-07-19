// to use the mongoose we have to install 
// npm install mongoose

const { create } = require("domain")
const mongoose = require("mongoose")
const { title } = require("process")
mongoose.connect("mongodb+srv://harshkumargupta630:meqsXVTivobwo4Cx@cluster0.abqlse5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// username :
// harshkumargupta630

// password
// meqsXVTivobwo4Cx


const topdoSchema = mongoose.Schema({
    title:String,
    descrription:String,
    completed:Boolean
})

const todo = mongoose.model('todos',topdoSchema)

module.exports = {
    todo
}