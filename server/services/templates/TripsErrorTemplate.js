/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Util from '../../helpers/util';
import { errorLogger }from '../../helpers/loggerHandle';

const util = new Util();

dotenv.config();

export const joiErrorsTemplate = (req,res,next,message)=>{
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

export const cityErrorTemplate = (req,res,city)=>{
  const Error = {
    error: `${city} City is not supported by Barefoot Nomad`,
    tip: 'Choose from the cities we have available....',
     };
     errorLogger(req, 404, Error);
     util.setError(404, Error);
     return util.send(res);

}