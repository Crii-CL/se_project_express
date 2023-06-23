const { celebrate, Joi } = require("celebrate");
const { valid } = require("joi");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": `The "email" field must be filled`,
    }),
    imageUrl: Joi.string().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": `The "name" field cannot be empty`,
    }),
    weather: Joi.string().required().valid("Hot", "Warm", "Cold").messages({
      "string.empty": `A "weather" type must be selected`,
    }),
    imageUrl: Joi.string().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    owner: Joi.string(),
    likes: Joi.array(),
  }),
});

exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": `The minimum length of the "name"field is 2`,
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(5).messages({
      "string.min": `The minimum length of the "password" field is 5`,
    }),
  }),
});

exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().messages({
      "string.empty": `The "itemId" field is empty`,
    }),
  }),
});

exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().messages({
      "string.empty": `The "userId" field is empty`,
    }),
  }),
});
