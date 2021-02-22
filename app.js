require('dotenv-flow').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('./src/config/passport')

const app = express()
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/users', passport.authenticate('jwt'), require('./src/controllers/users'))
app.use('/auth', require('./src/controllers/auth'))

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)

  res.status(500).json({ message: error.toString() })
})

app.listen(process.env.PORT, () => {
  console.info(`App is running at ${process.env.PORT} in ${app.get('env')} mode...`)
})
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.info('Mongo DB connected...')
})

module.exports = app
