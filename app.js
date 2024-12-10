const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/user')
const uploadRouter = require('./routes/upload')
const setJWTStrategy = require('./config/jwt')
const authMiddleware = require('./middleware/jwt')

setJWTStrategy()
const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static(path.resolve(__dirname, './public')));
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts',authMiddleware, contactsRouter)
app.use('/api/user', userRouter)
app.use('/upload', uploadRouter)

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: `Something broke! ${err.message}` })
})

module.exports = app
