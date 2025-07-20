const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://harshkumargupta630:meqsXVTivobwo4Cx@cluster0.abqlse5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,  // ✅ fixed typo
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);  // ✅ PascalCase for model name

module.exports = {
    Todo
};
