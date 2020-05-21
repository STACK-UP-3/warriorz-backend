import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../services/userService';
import sendEmail from '../services/email.create';
import emailTemplate from '../services/templates/verMessage';
import Util from '../helpers/util';
import photoService from '../services/photoService';
import { encode, decode } from '../helpers/resetEncode';
import { infoLogger } from '../helpers/loggerHandle';

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
      role: 'Requester',
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
    const subject = 'Verification Email';
    sendEmail(
      emailTemplate(token, newUser.firstname, newUser.lastname, newUser.email),
      subject,
      newUser.email,
    );

    const message = `Dear ${userGot.firstname} ${userGot.lastname}, A verification email has been sent to you email please go and confirm that email.`;
    const data = {
      id: userGot.id,
      email: userGot.email,
      role: userGot.role,
    };
    util.setSuccess(201, message, data);
    return util.send(res);
  }

  static async accountVerification(req, res) {
    const { token } = req.params;
    const getInfo = jwt.verify(token, process.env.JWT_KEY);

    await userService.updateAtt({ isVerified: true }, { email: getInfo.email });

    const message = 'Account was successfully verified.';

    util.setSuccess(200, message);
    return util.send(res);
  }

  static async sendResetPasswordEmail(req, res) {
    const { email } = req.body;
    const resetToken = encode({ email });
    const resetPasswordUrl = `${process.env.RESET_URL}?token=${resetToken}`;
    const subj = 'Barefoot Nomad - Password Reset (Expires In 1 hour)';
    const message = `Your password reset token (expires in 1 hour)<br/>Follow the link to reset it.<br/>If you didn't forget it ignore this message.<br/><br/>`;
    const footer = `For more info or questions, contact : ${process.env.EMAIL}`;
    const html = `<div>${message}<a href="${resetPasswordUrl}" style="background-color:#028b95;color:white;padding:10px 20px;text-decoration:none">Clik Here</a><br/><br/>${footer}</div>`;

    const returnMessage = sendEmail(html, subj, email);
    const msg = returnMessage.message;
    util.setSuccess(returnMessage.status, msg);
    return util.send(res);
  }

  static async resetPassword(req, res) {
    const { email } = decode(req.params.token);
    const password = await bcrypt.hash(req.body.password, 10);
    await userService.updateAtt({ password }, { email });
    const message = `Password changed successfully!`;
    util.setSuccess(200, message);
    return util.send(res);
  }

  /**
   * Sign in as a User
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @returns {*} JSON data
   */
  static async signIn(req, res) {
    // Get user from validated request
    const userRecord = req.user;

    // Create access token if user passes validation
    const userInfo = {
      id: userRecord.dataValues.id,
      fullName: `${userRecord.dataValues.firstname} ${userRecord.dataValues.lastname}`,
      email: userRecord.dataValues.email,
      role: userRecord.dataValues.role,
    };

    const accessToken = jwt.sign(userInfo, process.env.JWT_KEY, {
      expiresIn: '4h',
    });

    await userService.updateAtt({ token: accessToken }, { id: userInfo.id });
    const data = {
      access_token: accessToken,
      user: userInfo,
    };

    util.setSuccess(200, 'You have signed in successfully', data);
    return util.send(res);
  }

  static async signOut(req, res) {
    // Get user from validated request
    const userRecord = req.user;
    // Remove token from user record
    const queryResult = await userService.updateAtt(
      { token: null },
      { id: userRecord.id },
    );
    // Return API response
    util.setSuccess(200, 'You have logged out successfully', queryResult[1]);
    return util.send(res);
  }

  static async updateUserProfile(req, res) {
    const userId = req.userData.id;
    if (req.body.photoUrl) {
      const userPhotoUrl = await photoService.findByProp({ ownerId: userId });
      if (userPhotoUrl[0]) {
        await photoService.updatePhoto(
          { url: req.body.photoUrl },
          { ownerId: userId },
        );
      } else {
        const newPhoto = {
          ownerId: userId,
          type: 'user',
          url: req.body.photoUrl,
        };
        await photoService.createphoto(newPhoto);
      }
    }
    await userService.updateAtt(req.body, { id: userId });
    const message = 'Profile updated successfuly';
    infoLogger(req, 200, message);
    util.setSuccess(200, message, req.body);
    return util.send(res);
  }

  static async getUserProfile(req, res) {
    const userId = req.userData.id;
    const photoExist = await photoService.findByProp({ ownerId: userId });
    const photoUrl = photoExist[0] ? photoExist[0].dataValues.url : '';
    const userData = await userService.findByProp(req.body, { id: userId });

    const profile = {
      firstname: userData[0].dataValues.firstname,
      lastname: userData[0].dataValues.lastname,
      country: userData[0].dataValues.country,
      gender: userData[0].dataValues.gender,
      birthdate: userData[0].dataValues.birthdate,
      preferredLanguage: userData[0].dataValues.preferredLanguage,
      preferredCurrency: userData[0].dataValues.preferredCurrency,
      bio: userData[0].dataValues.bio,
      city: userData[0].dataValues.city,
      department: userData[0].dataValues.department,
      appNotification: userData[0].dataValues.appNotification,
      emailNotification: userData[0].dataValues.emailNotification,
      photoUrl,
    };
    const message = 'User profile found';
    infoLogger(req, 200, message);
    util.setSuccess(200, message, profile);
    return util.send(res);
  }

  static async update(req, res) {
    // Get required data from request
    const { id } = req.params;
    const { role } = req.body;
    // Update a single User in storage
    await userService.updateAtt({ role }, { id });
    // Return API response
    util.setSuccess(200, "User's role updated successfully");
    return util.send(res);
  }

  static async read(req, res) {
    // Get all Role instances from database storage
    const queryResult = await userService.getUsers();
    // Setup data object to be returned
    const data = queryResult.map((item) => item.dataValues);
    // Return API response
    util.setSuccess(200, 'Users retrieved successfully', data);
    return util.send(res);
  }
}

export default User;
