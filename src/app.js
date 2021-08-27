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

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.end(err)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.listen(port)