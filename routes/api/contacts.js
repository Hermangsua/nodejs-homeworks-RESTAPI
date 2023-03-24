const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const contactsController = require("../../controller/contactsController");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrlWrapper(contactsController.getAllContacts));

router.get("/:contactId", ctrlWrapper(contactsController.contactById));

router.post("/", auth, ctrlWrapper(contactsController.addNewContact));

router.delete("/:contactId", ctrlWrapper(contactsController.deleteById));

router.put("/:contactId", ctrlWrapper(contactsController.updateById));

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(contactsController.updateFavoriteById)
);

module.exports = router;
