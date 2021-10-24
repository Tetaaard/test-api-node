const express = require("express");
const userController = require("../controller/user");
const { validateCreateUser2 } = require("../controller/user.validate");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", validateCreateUser2, userController.createUser);

router.get("/", auth, userController.protectedRoute);

module.exports = router;
