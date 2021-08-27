const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./db/models/user')

app.use(express.json())

app.post('/user', (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.send('No user sent')
    }

    const { name, email, password } = req.body
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })

})

app.listen(port)