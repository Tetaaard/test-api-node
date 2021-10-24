const Joi = require("joi");

module.exports.validateCreateUser = (req, res, next) => {
  const user = req.body;

  // ça fonctionne sans try / catch, je ne comprends pas pourquoi ?
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};
