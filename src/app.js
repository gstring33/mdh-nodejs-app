const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./db/models/user')

app.use(express.json())

app.post('/user', async(req, res) => {
    if (!req.body) {
        return res.send('No user sent')
    }

    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)

    } catch (err) {
        res.status(400).send(err)
    }

})

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.end(err)
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.patch('/user/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        )

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.delete('/user/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send()
    }
})

app.listen(port)