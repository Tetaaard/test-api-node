const Joi = require("joi");

module.exports.validateCreateUser = (req, res, next) => {
  const user = req.body;

  // ça fonctionne alors que je l'appelle pas dans le controller, et ça me va mais je ne comprends pas pourquoi ? oO
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};
