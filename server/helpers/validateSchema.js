import Joi from '@hapi/joi';

export const signupValidateSchema = Joi.object({
  firstname: Joi.string().min(3).max(40).required(),
  lastname: Joi.string().min(3).max(40).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%&*]{3,25}$/)
    .required(),
  bio: Joi.string().min(5),
});

export const tripValidateSchema = Joi.object({
  origin: Joi.string().min(3).max(40).regex(/^[a-zA-Z][a-zA-Z\s]*$/).required(),
  destination: Joi.string().min(3).max(40).regex(/^[a-zA-Z][a-zA-Z\s]*$/).required(),
  date: Joi.date().iso().required(),
  returnDate: Joi.date().iso(),
  travelReason: Joi.string().min(3).max(40).regex(/^[a-zA-Z][a-zA-Z\s]*$/).required(),
  accommodationID: Joi.number().integer().required(),
});

export const validateEmail = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(new Error('The email is not a valid email!')),
});
export const validatePassword = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%&*]{3,25}$/)
    .required()
    .error(new Error('Password must be atleast 3 characters!')),
});

export const signinValidateSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
