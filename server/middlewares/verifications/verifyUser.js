import userService from '../../services/userService';
import Util from '../../helpers/util';
import { errorLogger } from '../../helpers/loggerHandle';


const util = new Util();

class UserVerification {
  static async checkUserByEmail(req, res, next) {
    const { email } = req.body;
    const getEmail = await userService.findByProp({ email });
    if (!getEmail[0]) {
      const errorMsg = `User with ${email} not found!`;
      errorLogger(req, 404, errorMsg);
      util.setError(404, errorMsg);
      return util.send(res);
    }
    if (!getEmail[0].dataValues.isVerified) {
      const errorMsg = `Please verify your account first!`;
      errorLogger(req, 403, errorMsg);
      util.setError(403, errorMsg);
      return util.send(res);
    }
    return next();
  }

  static async checkUserById(req, res, next) {
    const { id } = req.userData;
    const getUser = await userService.findByProp({ id });
    if (!getUser[0]) {
      const errorMsg = `User with ${id} not found!`;
      errorLogger(req, 404, errorMsg);
      util.setError(404, errorMsg);
      return util.send(res);
    }
    if (!getUser[0].dataValues.isVerified) {
      const errorMsg = `Please verify your account first!`;
      errorLogger(req, 403, errorMsg);
      util.setError(403, errorMsg);
      return util.send(res);
    }
    return next();
  }
}

export default UserVerification;
