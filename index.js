const express = require('express')

const app = express()

app.use(express.json())

app.listen(8080, ()=> {
    console.log('Server is running on port 8080')
})

const rotasTarefa = express.Router()
app.use('/tarefas', rotasTarefa)

