const Contact = require('../../models/Contact')

const fetchContacts = () => {
  return Contact.find()
}

const fetchContact = (id) => {
  return Contact.findOne({
    _id: id,
  })

}

const insertContact = ({ name, email, phone }) => {
  return Contact.create({
    name,
    email, 
    phone,
    favorite: false
  })

}

const updateContact = ({ id, toUpdate }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: toUpdate },
    {
      new: true,
      runValidators: true,
    }
  )
}

const removeContact = ({ id }) => {
  return Contact.findByIdAndDelete({
    _id: id
  })
}


module.exports = {
    fetchContacts,
    fetchContact,
    insertContact,
    updateContact,
    removeContact
}