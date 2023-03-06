const express = require("express");
const Joi = require("joi");
const shortid = require("shortid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

// Get all contacts
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
});

// Get one contact with id
router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  contact
    ? res.json({ data: contact })
    : res.status(404).json({ message: "Not found" });
});

// Add contact
router.post("/", async (req, res, next) => {
  const contact = req.body;
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const { value, error } = contactSchema.validate(contact);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    value.id = shortid.generate();
    const contact = await addContact(value);
    res.status(201).json({ data: contact });
  }
});

//  Delete one contact
router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  (await removeContact(id))
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = req.body;
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const { value, error } = contactSchema.validate(contact);

  if (!contact || error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const result = await updateContact(id, value);
    result
      ? res.status(200).json({ data: result })
      : res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
