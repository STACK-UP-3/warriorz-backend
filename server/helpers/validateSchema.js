import Joi from '@hapi/joi';

export const signupValidateSchema = Joi.object({
  firstname: Joi.string().min(3).max(40).required(),
  lastname: Joi.string().min(3).max(40).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
  bio: Joi.string().min(5),
});
