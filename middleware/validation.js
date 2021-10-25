const Joi = require("joi");

module.exports.withValidateBody = (schema) => (req, res, next) => {
  const data = Joi.object(schema);
  try {
    const { error } = data.validate(req.body);
    if (error) throw error;
    next();
  } catch (err) {
    next(err);
  }
};
