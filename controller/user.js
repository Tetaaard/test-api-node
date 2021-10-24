const User = require("../model/User");

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    await User.findOne({ email: req.body.email });

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();

    return res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports.protectedRoute = async (req, res, next) => {
  return res.status(200).send("route protégée");
};
