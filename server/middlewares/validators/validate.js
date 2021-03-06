import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  signupValidateSchema,
  validateEmail,
  validatePassword,
  signinValidateSchema,
  profileValidateSchema,
} from '../../helpers/validateSchema';
import userService from '../../services/userService';
import Util from '../../helpers/util';
import filteredProfile from '../../helpers/profileFilter';
import { decode } from '../../helpers/resetEncode';
import { errorLogger } from '../../helpers/loggerHandle';

const util = new Util();

dotenv.config();

class Validator {
  static async signupValidate(req, res, next) {
    const getEmail = await userService.findByProp({ email: req.body.email });

    if (getEmail[0]) {
      const Error = 'This email already exist in the database';
      util.setError(409, Error);
      return util.send(res);
    }

    const { error } = signupValidateSchema.validate({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
    });

    if (error) {
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('email')
      ) {
        const Error = {
          error: error.details[0].message.replace('/', '').replace(/"/g, ''),
          example: 'xxx@yyy.zzz',
        };
        util.setError(400, Error);
        return util.send(res);
      }
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('fails to match the required')
      ) {
        const Error = {
          error: 'Incorrect use of special characters',
          tip: `Please avoid characters that looks like = or /`,
        };
        util.setError(400, Error);
        return util.send(res);
      }

      const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
      util.setError(400, Error);
      return util.send(res);
    }
    return next();
  }

  static async verificationValidation(req, res, next) {
    try {
      const { token } = req.params;
      const getInfo = jwt.verify(token, process.env.JWT_KEY);
      const getUser = await userService.findByProp({ email: getInfo.email });

      if (getUser[0].dataValues.isVerified === true) {
        const Error = 'This Account is already verified';
        util.setError(409, Error);
        return util.send(res);
      }
      return next();
    } catch (error) {
      const Error = 'The token has expired';
      util.setError(410, Error);
      return util.send(res);
    }
  }

  static async forgotPasswordDataValidate(req, res, next) {
    const { email } = req.body;
    const { error } = validateEmail.validate({ email });
    if (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
    return next();
  }

  static async resetPasswordDataValidate(req, res, next) {
    const { email } = decode(req.params.token);
    if (!email) {
      const error = `The token is invalid or has expired!`;
      util.setError(403, error);
      return util.send(res);
    }
    const { password } = req.body;
    const { error } = validatePassword.validate({ password });
    if (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
    req.body.email = email;
    return next();
  }

  static validateSignInRequestData(req, res, next) {
    const { email, password } = req.body;

    const { error } = signinValidateSchema.validate({
      email,
      password,
    });

    if (error) {
      const message = error.details[0].message
        .replace('/', '')
        .replace(/"/g, '');
      util.setError(400, message);
      return util.send(res);
    }

    return next();
  }

  static async VerifyToken(req,res,next){
    const { token } = req.params;
    const getInfo = jwt.verify(token, process.env.JWT_KEY);

    const userRecord = await userService.findByEmail({ email : getInfo.email });

    req.user = userRecord;
    return next()
  }

  static async verifyUser(req, res, next) {
    const { email, password } = req.body;

    const userRecord = await userService.findByEmail({ email });

    if (!userRecord) {
      util.setError(404, 'Incorrect Email or Password');
      return util.send(res);
    }

    if (!userRecord.dataValues.isVerified) {
      let message = 'You must be verified to login. ';
      message += `To activate your account, click on the verification link sent to your email ${userRecord.dataValues.email}`;

      util.setError(403, message);
      return util.send(res);
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userRecord.dataValues.password,
    );

    if (!isCorrectPassword) {
      util.setError(403, 'Incorrect Email or Password');
      return util.send(res);
    }

    req.user = userRecord;
    return next();
  }

  static async profileUpdateValidate(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      const Error = 'Can not update empty data!';
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    const { error } = profileValidateSchema.validate(filteredProfile(req.body));
    if (error) {
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('fails to match the required')
      ) {
        const Error = {
          error: 'Incorrect use of special characters',
          tip: `Please avoid characters that looks like = or /`,
        };
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

      const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }
    if (req.body.photoUrl) {
      if (req.body.photoUrl.match(/\.(jpeg|jpg|png)$/) === null) {
        const Error = 'The userPhoto is not image url with(jpeg,jpg,png)!';
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }
    }
    req.body = filteredProfile(req.body);
    return next();
  }

  static async verifyResourceExists(req, res, next) {
    // Get model identifier from request parameters
    const { id } = req.params;

    // check database for existence
    const exists = await userService.findById(id);

    if (!exists) {
      util.setError(404, `User with id ${id} does not exist`);
      return util.send(res);
    }

    return next();
  }
}

export default Validator;
