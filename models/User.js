const mongoose = require('mongoose')
const bCrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          required: [true, 'Username is required'],
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
    },
    {
        versionKey: false,
    }
  )
  
userSchema.methods.setPassword = async function (password) {
      this.password = await bCrypt.hash(password, 10)
}
  
userSchema.methods.validatePassword = async function (password) {
    return await bCrypt.compare (password, this.password)
}
 
  const User = mongoose.model('User', userSchema, 'user')
  
  module.exports = User;