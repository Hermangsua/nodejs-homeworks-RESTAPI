const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const contact = contacts.find((el) => el.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const filteredContacts = contacts.filter((el) => el.id !== contactId);
  if (contacts.length === filteredContacts.length) {
    return false;
  } else {
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  }
};

const addContact = async (body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const newContactsList = [...contacts, body];
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return body;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  if (contacts.find((el) => el.id === contactId)) {
    body.id = contactId;
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? body : contact
    );
    try {
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
      return body;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
