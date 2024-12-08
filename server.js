const app = require('./app')

const mongoose = require('mongoose')
require('dotenv').config();

const { DB_HOST: urlDb } = process.env;
console.log(urlDb)
const connection = mongoose.connect(urlDb)


const startServer = async () => {
  try {
    await connection
    console.log("Database connection successful")
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
startServer()

