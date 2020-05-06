/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { 
    tripValidateSchema,
    tripIDValidateSchema,
    tripUpdateValidateSchema,
    requestQueryValidateSchema,
    MultipleDestinationTripValidateSchema } from '../../helpers/validateSchema';
import cityService from '../../services/cityService';
import Util from '../../helpers/util';
import { errorLogger }from '../../helpers/loggerHandle';
import {joiErrorsTemplate, cityErrorTemplate} from '../../services/templates/TripsErrorTemplate';

const util = new Util();
dotenv.config();
class TripValidations{

  static async createTripJoiValidation(req, res, next){
    const { error } = tripValidateSchema.validate(req.body);
    joiErrorsTemplate(req,res,next ,error);
  }

  static async createMultipleDestinationTripJoiValidation(req, res, next){
    const { error } = MultipleDestinationTripValidateSchema.validate(req.body);
    joiErrorsTemplate(req,res,next ,error);
 
  }

 static async createTripCityAndDateCheck(req, res, next){
    const findOrigin = await cityService.findByProp({city : req.body.origin  });
    const findDestination = await cityService.findByProp({city : req.body.destination });
    
    let city;
    if(!findOrigin[0]){
      city = 'Origin';
      return cityErrorTemplate(req,res,city);
     }
    if(!findDestination[0]){
     city = 'Destination';
     return cityErrorTemplate(req,res,city);
   }
 
   if((req.body.date) > (req.body.returnDate)){
     const Error = 'Return date can not be less than Travel date';
     errorLogger(req, 400, Error);
     util.setError(400, Error);
     return util.send(res);
   }

     next();
  }

  static async multipleCreateTripCityAndDateCheck(req, res, next){
    const findOrigin = await cityService.findByProp({city : req.body.origin  });

    if(!findOrigin[0]){
      return cityErrorTemplate(req,res,'Origin');
     }
    
    req.body.destinations.forEach(async destination =>{
      
      if(req.body.origin === destination){
        const Error = 'Origin and Destination can not be the same';
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

      const findDestination = await cityService.findByProp({city : destination });
      if(!findDestination[0]){
        return cityErrorTemplate(req,res,`Destination ${destination}`);
      }
    })

   if((req.body.date) > (req.body.returnDate)){
     const Error = 'Return date can not be less than Travel date';
     errorLogger(req, 400, Error);
     util.setError(400, Error);
     return util.send(res);
   }

     next();
  }

  static async createTripTypeCheck(req, _res, next){
      let type;
    if(req.body.returnDate){ 
      type='return-trip'; 
    } else { 
      type='one-way-trip'; 
    }
  req.tripType = type;
  next();
  }

  static async updateTripJoiValidation(req, res, next){
    const { error } = tripUpdateValidateSchema.validate({
    trip_id:req.params.trip_id,
    origin:req.body.origin, 
    destination:req.body.destination, 
    date:req.body.date, 
    returnDate:req.body.returnDate, 
    travelReason:req.body.travelReason, 
    accommodationID:req.body.accommodationID, 
    });
    
    joiErrorsTemplate(req,res,next ,error);
  
  }
  
  static async checkOpenTripCityAndDATE(req, res, next){
   let city;
   if(req.body.origin){
    const findOrigin = await cityService.findByProp({ city : req.body.origin  });
    if(!findOrigin[0]){
      city = 'Origin';
      return cityErrorTemplate(req,res,city);
    }; };

   if(req.body.destination){
    const findDestination = await cityService.findByProp({ city : req.body.destination });
    if(!findDestination[0]){
      city = 'Destination';
      return cityErrorTemplate(req,res,city);
  }; };

   if(req.body.returnDate){
     req.tripType = 'return-trip';
     if((req.body.date) > (req.body.returnDate)){
       const Error = 'Return date can not be less than Travel date';
       errorLogger(req, 400, Error);
       util.setError(400, Error);
       return util.send(res);
     }
    }
    
    next(); 
  };

  static async requestQueryValidation (req,res,next) {
    const { error } = requestQueryValidateSchema.validate(req.query);
      if(error){
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

      if(req.query.status){
        if(req.query.status !== 'accepted' && req.query.status !=='pending' && req.query.status !== 'rejected'){
          const Error = 'Incorrect status used.';
          errorLogger(req, 400, Error);
          util.setError(400, Error);
          return util.send(res);
        }
      }

      next();
  };

  static async tripIdValidation (req,res,next) {
    const { error } = tripIDValidateSchema.validate({
      trip_id:req.params.trip_id, 
      });
      if(error){
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }
      next();
  };

  static async userTripsSorting(req,_res,next){
      if(req.query.status){
      req.tripSortingData = {
        user_id: req.userData.id, 
        status: req.query.status,
      };
      return next();
      
      }
      req.tripSortingData = { user_id: req.userData.id };
      next();
  }

  static async managerTripsSorting(req,_res,next){
      if(req.query.status){  
        req.tripSortingData = { line_manager_id: req.userData.id, status: req.query.status};
        return next();
      };
      
      req.tripSortingData = { line_manager_id: req.userData.id };
      return next();
  }
}
export default TripValidations;
