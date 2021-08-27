const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./config/routes/user')


app.use(express.json())
app.use(userRouter)


app.listen(port)