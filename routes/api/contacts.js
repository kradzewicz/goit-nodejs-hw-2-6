const express = require('express');

const {
  getAllContacts,
  getContact,
  createContact,
  putContact,
  deleteContact,
  updateStatusContact
} = require('../../controllers/contacts/index');

const { validateContact, validateStatus } = require('../../validators/contactValidation');


const router = express.Router()

router.get('/', getAllContacts);
router.get('/:contactId', getContact);
router.post('/', validateContact, createContact);
router.put('/:contactId', validateContact, putContact);
router.delete('/:contactId', deleteContact)
router.patch('/:contactId/favorite', validateStatus, updateStatusContact)

module.exports = router