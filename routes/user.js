const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", userController.createUser);

router.get("/", auth, userController.protectedRoute);

module.exports = router;
