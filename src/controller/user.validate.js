//into folder validator
const Joi = require("joi");
  
module.exports.validateCreateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string(),
  });
  return schema.validate(user);
};

module.exports.validateCreateUserTest = (req, res, next) => {
  const user = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

module.exports.validateSignUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports.validateUpdateUserMail = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newEmail: Joi.string().email().required(),
  });
  return schema.validate(user);
};
