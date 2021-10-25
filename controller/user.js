const { saveUser } = require("../model/user.crud");

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = {
      name,
      email,
    };

    const response = await saveUser(user);

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.protectedRoute = async (req, res, next) => {
  return res.status(200).send("route protégée");
};
