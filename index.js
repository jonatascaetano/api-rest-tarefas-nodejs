const express = require('express')

const app = express()

app.use(express.json())

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

class Tarefa {
    constructor(id, title, body, done) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.done = done;
    }
}

let tarefas = [
    new Tarefa(1, 'Estudar JavaScript', 'Estudar sobre as features mais recentes do ES6', false),
    new Tarefa(2, 'Estudar Node.js', 'Estudar sobre o framework Node.js', false),
    new Tarefa(3, 'Estudar React.js', 'Estudar sobre o framework React.js', false),

]

const rotasTarefa = express.Router()
app.use('/tarefas', rotasTarefa)

rotasTarefa.get('/', (req, res) => {
    res.status(200).json(tarefas)
})
