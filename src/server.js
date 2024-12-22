require('dotenv').config()
const connectDb = require('./config/dbConnection')
const app = require('./app')
const { scheduleTasks } = require('./features/schedule/emailNotification')

connectDb().then()

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`)
  await scheduleTasks()
})

