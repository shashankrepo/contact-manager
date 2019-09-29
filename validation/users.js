const Joi = require('@hapi/joi');

const validateSignUp = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  return schema.validate(data);
};

const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  return schema.validate(data);
};

module.exports = { validateSignUp, validateLogin };
