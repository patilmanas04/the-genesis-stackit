require('dotenv').config()
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connected to MongoDB!!")
  }
  catch (error) {
    console.log("Failed to connect to MongoDB", error)
  }
}

module.exports = connectToMongoDB