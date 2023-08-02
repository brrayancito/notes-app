const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DATABASE_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
