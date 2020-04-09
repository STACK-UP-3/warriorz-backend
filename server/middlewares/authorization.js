/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Util from '../helpers/util';
import userService from '../services/userService';
import managementService from '../services/userManagementService';
import { errorLogger, debugLogger } from '../helpers/loggerHandle';

dotenv.config();

const util = new Util();

export const authorizationCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const viewToken = await userService.findByProp({ token });
    if (!viewToken[0]) {
      const Error = 'Unauthorised Access: You have to login to Proceed';
      errorLogger(req, 401, Error);
      util.setError(401, Error);
      return util.send(res);
    }
    req.userData = decoded;
    next();
  } catch (error) {
    const Error = 'No token provided or Token expired';
    errorLogger(req, 401, Error);
    util.setError(404, Error);
    return util.send(res);
  }
};

export const findManagerByUserID = async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const viewManagement = await managementService.findByProp({
    user_id: decoded.id,
  });
  if (!viewManagement[0]) {
    const Error =
      'Unauthorised Access: Dear user you do not have a manager at the moment.';
    debugLogger(req, 401, Error);
    util.setError(401, Error);
    return util.send(res);
  }
  const viewManager = await userService.findByProp({
    id: viewManagement[0].dataValues.line_manager_id,
  });
  req.manData = viewManager[0].dataValues;
  req.userData = decoded;
  next();
};
