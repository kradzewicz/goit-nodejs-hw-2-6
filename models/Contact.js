const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    }, {
      versionKey: false,
      // timestamps: true,
    }
  )
  
  const Contact = mongoose.model('Contact', contactSchema, 'contacts')
  
  module.exports = Contact;