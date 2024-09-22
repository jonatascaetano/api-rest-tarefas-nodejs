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

rotasTarefa.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido. Deve ser um número inteiro positivo.' });
    }

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(tarefa);
})

rotasTarefa.post('/', (req, res) => {
    const { title, body, done } = req.body;
    let id = generateUniqueID();
    let tarefa = new Tarefa(id, title, body, done);
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
})

function generateUniqueID() {
    let id
    do {
        id = Math.floor(Math.random() * 1000) + 1;
    } while (tarefas.some(tarefa => tarefa.id === id));

    return id
}

rotasTarefa.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido. Deve ser um número inteiro positivo.' });
    }
    const tarefa = tarefas.find(tarefas => tarefas.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    const { title, body, done } = req.body;

    tarefa.title = title || tarefa.title;
    tarefa.body = body || tarefa.body;
    tarefa.done = done || tarefa.done;

    res.status(200).json(tarefa);
})

