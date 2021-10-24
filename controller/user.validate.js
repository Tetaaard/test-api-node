const Joi = require("joi");

module.exports.validateCreateUser = (req, res, next) => {
  const user = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  });

  try {
    const { error } = schema.validate(user);
    if (error) next(error);
    next();
  } catch (err) {
    next(err);
  }
};
