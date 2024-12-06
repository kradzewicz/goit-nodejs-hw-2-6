const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.required()
})

router.get('/', async (req, res, next) => {
  const contactList = await listContacts()
  res.json({
    message: 'listed contacts',
    contactList
   })
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId.toString()
  const contact = await getContactById(id)

  if (!contact) {
    return res.status(404).json({
      message: `Not found`
    })
  } 
  res.json({ message: 'Contact founded', contact })
})

router.post('/', async (req, res, next) => {
  const body = req.body;
  const validatedBody = schema.validate(body)
  try {
    if (validatedBody.error) {
      res.status(400).json({ message: validatedBody.error.message })
      throw (new Error('Failed to add contact'));
    } else {
      const newContact = await addContact(validatedBody);
      res.status(201).json({
        message: 'New contact has been added',
        newContact
      })
    }
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId.toString()
  const contact = await removeContact(id)

  if (!contact) {
    return res.status(404).json({
      message: `Not found`
    })
  } 
  res.json({ message: 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId.toString()
  const contact = await getContactById(id)

 

  const body = req.body;
  const validatedBody = schema.validate(body)
  try {
    if (!contact) {
      res.status(404).json({
        message: `Not found`
      })
    } else if (validatedBody.error) {
      throw (new Error('Failed to update contact'));
    } else {
      const updatedContact = await updateContact(id, validatedBody);
      console.log(lolololololo)
      res.status(200).json({
        message: 'Contact has been updated',
        updatedContact
      })
    }
  } catch (e) {
    res.status(400).json({ message: `Failed to update contact: ${validatedBody.error.message}` })
    console.log(e)
  }

})

module.exports = router
