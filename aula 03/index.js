const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

require('dotenv').config()

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('DB connectado')
})

//Criar a applicação
//Criar as rotas
//getAll --> retornar todos os elementos do BD
//getOne --> retornar um elemento de acordo com o id (ou outro campo específico)
//post   --> criar um documento no BD
//delete --> apagar um documento no BD
//update --> atualizar um documento no BD

//Criar a lógica do negócio

const port = 3000
const app = express()

// app.get('/', (req, res) => {
//     res.send('Hello world')
// })

app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})