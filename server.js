const app = require('./app')
const mongoose = require('mongoose')
const path = require("path");
const { setupFolder } = require('./middleware/helpers');

require('dotenv').config();

const { DB_HOST: urlDb } = process.env;
const connection = mongoose.connect(urlDb)

const tempDir = path.join(process.cwd(), "public/temp");
const storeImageDir = path.join(process.cwd(), "public/images");

const startServer = async () => {
  try {
    await connection
    console.log("Database connection successful")
    app.listen(3000, () => {
      setupFolder(tempDir)
      setupFolder(storeImageDir)
      console.log("Server running. Use our API on port: 3000")
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
startServer()

