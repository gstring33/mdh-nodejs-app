const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/mdh-nodejs-app'

mongoose.connect(uri, {
    useNewUrlParser: true
})