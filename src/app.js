const express = require('express')
const cors = require('cors')
const birthdayRoutes = require('./routes/birthdayRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

const allowedOrigins = ['http://localhost:3000', 'https://birthday-reminder-app.pages.dev']

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}))

app.use(express.json())

app.use('/api/v1/birthdays', birthdayRoutes)
app.use('/api/v1/users', userRoutes)

module.exports = app
