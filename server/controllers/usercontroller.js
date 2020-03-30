import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../services/userService';
import sendEmail from '../services/email.create';
import emailTemplate from '../services/templates/verMessage'; 
import Util from '../helpers/util';

const util = new Util();

dotenv.config();
class User {
  static async signUp(req, res) {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      bio: req.body.bio,
    };
    

    const inserter = await userService.createuser(newUser);
    const userGot = inserter.dataValues;
    const token = jwt.sign(
      {
        id: userGot.id,
        email: userGot.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '4h',
      },
    );
    const subject ='Verification Email';
    
    sendEmail(emailTemplate(token,newUser.firstname, newUser.lastname, newUser.email), subject, newUser.email);

    const message = `Dear ${userGot.firstname} ${userGot.lastname}, A verification email has been sent to you email please go and confirm that email.`;
    const data = {
      id: userGot.id,
      email: userGot.email,
    }
    util.setSuccess(201, message, data);
    return util.send(res);
  }

  static async accountVerification(req, res) {
      const { token } = req.params;
      const getInfo = jwt.verify(token, process.env.JWT_KEY);

      await userService.updateAtt(
        { isVerified: true },
        { email: getInfo.email },
      );
      
      const message = 'Account was successfully verified.';

      util.setSuccess(200, message);
      return util.send(res);
  }
}

export default User;
