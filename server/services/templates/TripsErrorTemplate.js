/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Util from '../../helpers/util';
import { errorLogger }from '../../helpers/loggerHandle';

const util = new Util();

dotenv.config();

export default (req,res,next,message)=>{
    if (message) {
      
    if (
      message.details[0].message
        .replace('/', '')
        .replace(/"/g, '')
        .includes('must be in ISO')
    ) {
      const Error = {
        error: 'Incorrect Date Format',
        format: 'YYYY-MM-DD',
        path: message.details[0].path[0],
      };

      errorLogger(req, 400, Error);

      util.setError(400, Error);
      return util.send(res);
    }
    if (
      message.details[0].message
        .replace('/', '')
        .replace(/"/g, '')
        .includes('fails to match the required')
    ) {
      const Error = {
        error: 'Incorrect use of special characters',
        tip:`Please avoid using numbers or special characters characters that looks like = or /`,
        path: message.details[0].path[0],
      };
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    const Error = message.details[0].message.replace('/', '').replace(/"/g, '');
    errorLogger(req, 400, Error);
    util.setError(400, Error);
    return util.send(res);
  }
     
  next();
}
