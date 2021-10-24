const express = require("express");
const { createUser, updateUserMail, createUserTest } = require("../controller/user");
const { validateCreateUser, validateUpdateUserMail } = require("../controller/user.validate");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/User");

router.post("/", async (req, res) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email } = req.body;

    const user = await createUser(name, email);

    const token = jwt.sign({ user }, process.env.JWTPRIVATEKEY);

    res.cookie("token", token, { maxAge: new Date(), httpOnly: true });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/create", createUserTest);

router.put("/", auth, async (req, res) => {
  try {
    const { error } = validateUpdateUserMail(req.body);
    if (error) return res.status(400).json({ message: error.detail[0].message });

    const { email, newEmail } = req.body;

    if (email != req.user.user.email) return res.status(400).json({ message: "mauvais email" });

    const userUpdated = await updateUserMail(email, newEmail);

    res.status(200).json(userUpdated);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
