/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { tripValidateSchema,tripUpdateValidateSchema } from '../../helpers/validateSchema';
import cityService from '../../services/cityService';
import Util from '../../helpers/util';
import { errorLogger }from '../../helpers/loggerHandle';
import {joiErrorsTemplate, cityErrorTemplate} from '../../services/templates/TripsErrorTemplate';

const util = new Util();
dotenv.config();
class TripValidations{

 static async CreateTripJoiValidation(req, res, next){
    const { error } = tripValidateSchema.validate(req.body);
    joiErrorsTemplate(req,res,next ,error);
 
  }

 static async CreateTripCityAndDateCheck(req, res, next){
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

 static async CreateTripTypeCheck(req, _res, next){
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
}
export default TripValidations;
