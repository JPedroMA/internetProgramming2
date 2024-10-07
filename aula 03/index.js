const express = require('express')
const mongoose =  require('mongoose')
const routes = require('./routes/routes')
const app = express()
require("dotenv").config()

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)

const database = mongoose.connection

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log("DB connectado")
})

app.get('/', (req, res) => {
  res.send('Hello World! DB2')
})

//criar a aplicação
//criar as rotas
//criar a logica do negocio


const port = 3000

/*app.get('/', (req, res) => {
  res.send('Hello World')
})*/

app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})