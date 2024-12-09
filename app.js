const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/user')
const setJWTStrategy = require('./config/jwt')
const authMiddleware = require('./middleware/jwt')

setJWTStrategy()
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/user',authMiddleware, userRouter)

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: `Something broke! ${err.message}` })
})

module.exports = app
