const Joi = require('@hapi/joi');

const validateContactAdd = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(3)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(6)
      .max(32)
      .required(),
    type: Joi.string().valid('Personal', 'Professional')
  });
  return schema.validate(data);
};

const validateContactUpdate = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(3)
      .max(50),
    phone: Joi.string()
      .min(6)
      .max(32),
    type: Joi.string().valid('Personal', 'Professional')
  });
  return schema.validate(data);
};

module.exports = { validateContactAdd, validateContactUpdate };
