const fs = require('fs/promises')
const {nanoid} = require('nanoid')

const contactsPath = "./models/contacts.json"

// const listContacts = async () => {
async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(contactsData.toString())
    return contactsList
    
  } catch (err) {
    console.log(err.message)
  }
}

// const getContactById = async (contactId) => {
async function getContactById(contactId) {
  try {
      const contactsList = await listContacts()
      const contact = contactsList.filter((contact) => contact.id === contactId)
      if (contact.length > 0) {
        return contact
      } else {
          console.log(`Contact with id ${contactId} doesn't exist` )
      }
  } catch (err) {
      console.log(err.message)
  }
}

// const removeContact = async (contactId) => {
async function removeContact(contactId) {
  try {
    const contactsList = await listContacts()
    const contact = contactsList.filter((contact) => contact.id === contactId)

      if (contact.length > 0) {
        const newContactList = contactsList.filter((contact) => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
        console.log("Contact has been deleted!")
        return newContactList
      } else {
        console.log(`Contact with id ${contactId} doesn't exist`)
        return
      }
  } catch (err) {
      console.log(err.message)
  }
}

// const addContact = async (body) => {
async function addContact(body) {
  try {
    const {name, email, phone} = body.value
      const contactsList = await listContacts()
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone
    }
      contactsList.push(newContact)

      await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
      console.log(`name: ${name} \nemail: ${email} \nphone ${phone}\nContact has been added`)
      
  } catch (err) {
      console.log(err.message)
  }
}



const updateContact = async (contactId, body) => {
  
  try {
    const {name, email, phone} = body.value
    const contactsList = await listContacts()
    const newContactList = contactsList.filter((contact) => contact.id !== contactId)
    const newContact = {
      id: contactId,
      name: name,
      email: email,
      phone: phone
    }
      newContactList.push(newContact)

      await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
      console.log(`id: ${contactId} \nname: ${name} \nemail: ${email} \nphone ${phone}\nContact has been updated`)
      return newContact
  } catch (err) {
      console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
