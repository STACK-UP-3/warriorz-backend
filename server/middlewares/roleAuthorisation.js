import 'dotenv/config';
import Util from '../helpers/util';

const util = new Util();

const allow = (...roles) => {
  // Define a simple role check function
  const isAllowed = (role) => roles.indexOf(role) > -1;

  // Define a middleware
  const authorise = (req, res, next) => {
    const { role } = req.userData;
    // Check for current user role in allowed list
    const roleAllowed = isAllowed(role);
    // Return error if role not allowed
    if (!roleAllowed) {
      util.setError(
        403,
        `Forbidden route: Dear user you are not allowed to carry out this activity.`,
      );
      return util.send(res);
    }
    // Otherwise, continue on the next middleware
    return next();
  };
  // Return the middleware
  return authorise;
};

export default allow;
