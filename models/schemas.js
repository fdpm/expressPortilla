const Joi = require("joi");

const schemas = {
  user: Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).required(),
    lastname: Joi.string().alphanum().min(3).required(),
    username: Joi.string().alphanum().min(8).required(),
    identification: Joi.number().required(),
    password: Joi.string().alphanum().required(),
    photo: Joi.string().required(),
    active: Joi.boolean().required(),
    token: [Joi.string().alphanum(), Joi.number()],
  }),
  note: Joi.object().keys({
    title: Joi.string().min(3).required(),
    comment: Joi.string().min(3).required(),
  })
};

module.exports = schemas;