// this is mainly for the validation  and using the Zod and  to install the zod is the 
// npm install zod 
const zod = require("zod")
const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateTodo = zod.object({
    id: zod.string(),
})

module.exports = {
    createTodo: createTodo,
    updateTodo: updateTodo,
}