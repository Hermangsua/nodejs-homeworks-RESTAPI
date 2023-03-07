const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const Joi = require("joi");
const shortid = require("shortid");
const { RequestError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
};

const contactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json({ data: contact });
};

const addNewContact = async (req, res, next) => {
  const contact = req.body;
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const { value, error } = contactSchema.validate(contact);

  if (error) {
    throw RequestError(400, "Missing required name field");
  } else {
    value.id = shortid.generate();
    const contact = await addContact(value);
    res.status(201).json({ data: contact });
  }
};

const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await removeContact(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = req.body;
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const { value, error } = contactSchema.validate(contact);

  if (!contact || error) {
    throw RequestError(400, "Missing fields");
  } else {
    const result = await updateContact(id, value);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ data: result });
  }
};

module.exports = {
  getAllContacts,
  contactById,
  addNewContact,
  deleteById,
  updateById,
};
