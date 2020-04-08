import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  signupValidateSchema,
  signinValidateSchema,
} from '../../helpers/validateSchema';
import userService from '../../services/userService';
import Util from '../../helpers/util';

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

  static validateSignInRequestInput(req, res, next) {
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

  static async validateSignIn(req, res, next) {
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
}

export default Validator;
