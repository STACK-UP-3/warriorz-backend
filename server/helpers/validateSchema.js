import Joi from '@hapi/joi';

export const signupValidateSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .min(3)
    .max(40)
    .required(),
  lastname: Joi.string()
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .min(3)
    .max(40)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9!@#$%&*]{3,25}$/)
    .required(),
  bio: Joi.string().min(5),
});

export const tripValidateSchema = Joi.object({
  origin: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .required(),
  destination: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .required(),
  date: Joi.date().iso().required(),
  returnDate: Joi.date().iso(),
  travelReason: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .required(),
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

export const tripUpdateValidateSchema = Joi.object({
  trip_id: Joi.number().integer(),
  origin: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/),
  destination: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/),
  date: Joi.date().iso(),
  returnDate: Joi.date().iso(),
  travelReason: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/),
  accommodationID: Joi.number().integer(),
});

export const tripIDValidateSchema = Joi.object({
  trip_id: Joi.number().integer(),
  notification_id: Joi.number().integer(),
});

export const requestQueryValidateSchema = Joi.object({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
  status: Joi.string(),
});

export const profileValidateSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z0-9]/),
  lastname: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z0-9]/),
  country: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z]/),
  gender: Joi.string()
    .max(5)
    .pattern(/^[a-zA-Z]/),
  birthdate: Joi.date(),
  preferredLanguage: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]/),
  preferredCurrency: Joi.string().min(1).max(10),
  bio: Joi.string().min(3).max(300),
  city: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z]/),
  department: Joi.string().min(1).max(100),
  appNotification: Joi.boolean(),
  emailNotification: Joi.boolean(),
  photoUrl: Joi.string().uri(),
});

const imageValidateSchema = Joi.object().keys({
  url: Joi.string()
    .uri()
    .pattern(/\.(jpeg|jpg|png)$/)
    .required(),
  details: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/),
});

const serviceValidateSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(300)
    .pattern(/^[a-zA-Z0-9]/)
    .required(),
  cost: Joi.string(),
  description: Joi.string()
    .min(3)
    .max(400)
    .pattern(/^[a-zA-Z0-9]/),
});

const roomValidateSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/)
    .required(),
  cost: Joi.string(),
  description: Joi.string()
    .min(3)
    .max(400)
    .pattern(/^[a-zA-Z0-9]/),
  status: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z0-9]/),
  type: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z0-9]/)
    .required(),
  accommodationId: Joi.number().integer(),
  roomNumber: Joi.number().integer().required(),
  similarRooms: Joi.number().integer(),
  image: Joi.object({
    url: Joi.string()
      .uri()
      .pattern(/\.(jpeg|jpg|png)$/)
      .required(),
    details: Joi.string()
      .min(3)
      .max(40)
      .pattern(/^[a-zA-Z0-9]/),
  }),
});

export const accommodationValidateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/)
    .required(),
  description: Joi.string()
    .min(3)
    .max(500)
    .pattern(/^[a-zA-Z0-9]/),
  location: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z]/)
    .required(),
  owner: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z]/)
    .required(),
  cost: Joi.string(),
  type: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-Z]/)
    .required(),
  status: Joi.string().pattern(/^[a-zA-Z]/),
  images: Joi.array().min(1).items(imageValidateSchema).required(),
  services: Joi.array().min(1).items(serviceValidateSchema).required(),
  rooms: Joi.array().min(1).items(roomValidateSchema).required(),
});

export const queryParamsValidateSchema = Joi.object({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
  city: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9]/),
});

export const idValidateSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const bookingDataValidateSchema = Joi.object({
  accommodationId: Joi.number().integer().required(),
  roomId: Joi.number().integer().required(),
  tripId: Joi.number().integer().required(),
  checkInDate: Joi.date().iso().required(),
  checkOutDate: Joi.date().iso().required(),
});
