/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { tripValidateSchema } from '../../helpers/validateSchema';
import cityService from '../../services/cityService';
import Util from '../../helpers/util';
import { errorLogger }from '../../helpers/loggerHandle';

const util = new Util();

dotenv.config();


 export const tripValidation = async(req, res, next)=>{
    
    const { error } = tripValidateSchema.validate(req.body);

    if (error) {
      
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('must be in ISO')
      ) {
        const Error = {
          error: 'Incorrect Date Format',
          format: 'YYYY-MM-DD',
          path: error.details[0].path[0],
        };

        errorLogger(req, 400, Error);

        util.setError(400, Error);
        return util.send(res);
      }
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('fails to match the required')
      ) {
        const Error = {
          error: 'Incorrect use of special characters',
          tip:`Please avoid using numbers or special characters characters that looks like = or /`,
          path: error.details[0].path[0],
        };
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

      const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }
    next();
  }

  export const cityAndDateCheck= async(req, res, next)=>{
    const findOrigin = await cityService.findByProp({city : req.body.origin });
    const findDestination = await cityService.findByProp({city : req.body.destination });
    
    let city;
    if(!findOrigin[0]){
         city = 'Origin';
         const Error = {
          error: `${city} City is not supported by Barefoot Nomad`,
          tip: 'Choose from the cities we have available....',
        };
        errorLogger(req, 400, Error);
        util.setError(404, Error);
        return util.send(res);
     }
    if(!findDestination[0]){
        city = 'Destination';
        const Error = {
          error: `${city} City is not supported by Barefoot Nomad`,
          tip: 'Choose from the cities we have available....',
        };
        errorLogger(req, 400, Error);
        util.setError(404, Error);
        return util.send(res);
      }
 
      if((req.body.date) > (req.body.returnDate)){
        const Error = 'Return date can not be less than Travel date';
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

     next();
  }
   
  
export const tripTypeCheck = async(req, _res, next)=>{
    let type;

    if(req.body.returnDate){
        type='return-trip';
  } else {
        type='one-way-trip';
  }

 req.tripType = type;
 next();
}
