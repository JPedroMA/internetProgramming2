const moongoose = require('mongoose')

const dataSchema = new moongoose.Schema({
    name: {
        required:true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = moongoose.model('Data', dataSchema)