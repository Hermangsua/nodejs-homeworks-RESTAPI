const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const contactsController = require("../../controller/contactsController");

const router = express.Router();

router.get("/", ctrlWrapper(contactsController.getAllContacts));

router.get("/:contactId", ctrlWrapper(contactsController.contactById));

router.post("/", ctrlWrapper(contactsController.addNewContact));

router.delete("/:contactId", ctrlWrapper(contactsController.deleteById));

router.put("/:contactId", ctrlWrapper(contactsController.updateById));

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(contactsController.updateFavoriteById)
);

module.exports = router;

// password P4NeUurQEFUsvP9x
// hermangsua;

// DB
// LSNar2t$JLrKMe!
// hermangsua;
