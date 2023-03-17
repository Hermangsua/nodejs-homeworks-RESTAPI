const Joi = require("joi");
const shortid = require("shortid");
const { RequestError } = require("../helpers");
const Contact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, "-__v");
  res.status(200).json({ data: contacts });
};

const contactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json({ data: contact });
};

const addNewContact = async (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const { value, error } = contactSchema.validate(req.body);

  if (error) {
    throw RequestError(400, "Missing required name field");
  } else {
    value.id = shortid.generate();
    const contact = await Contact.create(req.body);
    res.status(201).json({ data: contact });
  }
};

const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const { value, error } = contactSchema.validate(req.body);

  if (!contact || error) {
    throw RequestError(400, "Missing fields");
  } else {
    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ data: result });
  }
};

const updateFavoriteById = async (req, res, next) => {
  const contactSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const { value, error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing field favorite");
  }
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts,
  contactById,
  addNewContact,
  deleteById,
  updateById,
  updateFavoriteById,
};
