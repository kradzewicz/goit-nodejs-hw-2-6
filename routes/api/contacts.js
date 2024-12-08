const express = require('express')

const Contact = require('../../models/ContactSchema.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contactList = await Contact.find();
  res.json({
    message: 'listed contacts',
    contactList
   })
})

module.exports = router
