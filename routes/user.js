const express = require("express");
const userController = require("../controller/user");
const { withValidateBody } = require("../middleware/validation");
const router = express.Router();
const auth = require("../middleware/auth");
const Joi = require("joi");

router.post(
  "/",
  withValidateBody({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
  userController.createUser
);
router.get("/", auth, userController.protectedRoute);

module.exports = router;
