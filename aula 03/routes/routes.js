const express = require('express')
const router = express.Router()
const Model = require('../models/model')

//Post
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//GET ALL
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find()
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//GET ONE
router.get('/getOne/:name', async (req, res) => {
    try {
        const data = await Model.find({name: {$regex: req.params.name, $options: "i"}})
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
    // *. asterisco altera ultimo char + x chars e termina com next text, exemplo aa*.b começa com a e termina com b
})

//UPDATE
router.patch('/update/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body
        const options = {new: true}

        const result = await Model.findByIdAndDelete(id, updateData, options)

        res.send(result) // testar res.status
        // testar o strict mode
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//DELETE
router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)
        res.status(200).json(`Documento com ${data.name} foi apagado...`)

    } catch (error) {
        res.status(400).json
    }
})

module.exports = router
