const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const authController = require("../../controller/authController");
const { validateBody } = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemas/auth");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(authController.register)
);
router.post(
  "/login",
  validateBody(loginSchema),
  ctrlWrapper(authController.login)
);
router.get("/logout", auth, ctrlWrapper(authController.logout));
router.get("/current", auth, ctrlWrapper(authController.current));

module.exports = router;
