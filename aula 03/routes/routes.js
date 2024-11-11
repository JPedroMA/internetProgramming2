const express = require('express')
const router = express.Router()
const Model = require('../model/model')

//Post
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name, 
        age: req.body.age
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

//GET ALL
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find()
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//GET ONE
router.get('/getOne/:name', async (req, res) => {
    try{
        const data = await Model.find({name: {$regex: req.params.name, $options: "i"}})
        res.status(200).json(data)
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

//UPDATE
router.patch('/update/:id', async(req, res) => {
    try {
        const id = req.params.id
        const updateData = req.body
        const options = { new: true, strict: false}
        const result = await Model.findByIdAndUpdate(id, updateData, options)
        res.status(200).json(result) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//DELETE
router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)
        res.status(200).json(`Documento com o nome ${data.name} foi apagado...`)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router