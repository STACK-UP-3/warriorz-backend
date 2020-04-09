import 'dotenv/config';
import jwt from 'jsonwebtoken';

import Util from '../helpers/util';

const util = new Util();

const allow = (...roles) => {
  // Define a simple role check function
  const isAllowed = (role) => roles.indexOf(role) > -1;

  // Define a middleware
  const authorise = (req, res, next) => {
    // Return error if no token provided
    if (!req.headers.authorization) {
      util.setError(401, 'Token must be provided');
      return util.send(res);
    }

    // Get current user role from access token
    const { role } = jwt.verify(req.headers.authorization, process.env.JWT_KEY);

    // Check for current user role in allowed list
    const roleAllowed = isAllowed(role);

    // Return error if role not allowed
    if (!roleAllowed) {
      util.setError(403, 'Forbidden route');
      return util.send(res);
    }

    // Otherwise, continue on the next middleware
    return next();
  };

  // Return the middleware
  return authorise;
};

export default allow;
