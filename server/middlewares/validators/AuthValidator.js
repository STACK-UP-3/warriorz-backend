import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userService from '../../services/userService';
import Util from '../../helpers/util';

const util = new Util();

class AuthValidator {
  static async requestTokenExists(req, res, next) {
    // Check for token in request headers
    if (!req.headers.authorization) {
      util.setError(403, 'Token not provided');
      return util.send(res);
    }

    return next();
  }

  static async verifyToken(req, res, next) {
    // Get token from request
    const accessToken = req.headers.authorization;

    // Get decoded data from token
    const { email } = jwt.verify(accessToken, process.env.JWT_KEY);

    if (!email) {
      util.setError(403, 'Token is invalid: Missing email');
      return util.send(res);
    }

    req.email = email;

    return next();
  }

  static async userTokenExists(req, res, next) {
    // Get token from request
    const accessToken = req.headers.authorization;

    // Get token from user record in database
    const queryResult = await userService.findByEmail({ email: req.email });
    // Return error for no user record
    if (!queryResult) {
      util.setError(404, 'User does not exist');
      return util.send(res);
    }
    // Return error for user not logged in
    if (!queryResult.dataValues.token) {
      util.setError(403, 'User has no token: Please sign in first');
      return util.send(res);
    }

    // Check if request token matches user token
    const matchingTokens = accessToken === queryResult.dataValues.token;

    if (!matchingTokens) {
      util.setError(403, 'Token is invalid');
      return util.send(res);
    }

    req.user = queryResult.dataValues;

    return next();
  }
}

export default AuthValidator;
