const express = require('express')
const app = express()

app.get('', (req, res) => {
    if (!req.query.name) {
        return res.send('Your name is noboby')
    }

    res.send('Hello ' + req.query.name)
})

app.listen(3000)