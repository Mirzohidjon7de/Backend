const router = require("express").Router()
const fs = require("fs/promises");
const moment = require("moment")


router.get("/", todoGet)
router.post("/", createTodo)
router.get("/delete/:id", deleteTodo)
router.patch("/:id", updateTodo)

async function todoGet(req, res) {
    const data = await fs.readFile("./data.json", "utf-8");
    const todos = JSON.parse(data)

    todos.map(todo => {
        todo.createdAt = moment(todo.createdAt).locale("uz-latn").format("LLL")
    })
    res.render('todo', {
        todos
    })
}

async function createTodo(req, res) {
    const { ism, izoh } = req.body
    const data = await fs.readFile("./data.json", "utf-8");
    const todos = JSON.parse(data)
    const newTodo = {
        id: todos.length + 1,
        title: ism,
        descripton: izoh,
        createdAt: new Date(),
        status: false
    }
    todos.push(newTodo)
    await fs.writeFile('./data.json', JSON.stringify(todos))
    res.redirect('/todos')

}

async function deleteTodo(req, res) {
    const { id } = req.params
    const data = await fs.readFile("./data.json", "utf-8");
    const todos = JSON.parse(data)

    const todoIndex = todos.findIndex(el => el.id === id)

    todos.splice(todoIndex, 1)

    await fs.writeFile('./data.json', JSON.stringify(todos))
    res.redirect('/todos')

}

async function updateTodo(req, res) {
    console.log(req.params);
    const { id } = req.params
    const data = await fs.readFile('./data.json', 'utf-8')
    const todos = JSON.parse(data)
    const todoIndex = todos.findIndex(el => el.id == id)
    todos[todoIndex] = {
        ...todos[todoIndex],
        ...req.body
    }

    await fs.writeFile('./data.json', JSON.stringify(todos))

    res.json({
        ok: true
    })
}
module.exports = router