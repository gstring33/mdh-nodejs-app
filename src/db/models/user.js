const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: (value) => validator.isEmail(value)
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User