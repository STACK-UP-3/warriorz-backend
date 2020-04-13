import userService from '../../services/userService';
import Util from '../../helpers/util';

const util = new Util();

class UserVerification {
  static async checkUserByEmail(req, res, next) {
    const { email } = req.body;
    const getEmail = await userService.findByProp({ email });
    if (!getEmail[0]) {
      const errorMsg = `User with ${email} not found!`;
      util.setError(404, errorMsg);
      return util.send(res);
    }
    return next();
  }

  static async isAccountVerified(req, res, next) {
    const { email } = req.body;
    const getEmail = await userService.findByProp({ email });
    if (!getEmail[0].dataValues.isVerified) {
      const errorMsg = `Please verify your account first!`;
      util.setError(403, errorMsg);
      return util.send(res);
    }
    return next();
  }
}

export default UserVerification;
