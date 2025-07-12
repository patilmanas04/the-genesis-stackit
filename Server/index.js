const connectToMongoDB = require('./database')
const express = require('express')
const cors = require('cors')

connectToMongoDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send("Server is running!")
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})