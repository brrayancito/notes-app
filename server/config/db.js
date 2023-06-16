const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

//Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_DATABASE_URL);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
