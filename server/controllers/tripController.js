import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import dotenv from 'dotenv';
import tripService from '../services/tripServices';
import reqService from '../services/tripReqService';
import cityService from '../services/cityService';
import Util from '../helpers/util';
import { infoLogger }from '../helpers/loggerHandle';

const util = new Util();

dotenv.config();

class TripController {
  static async createTripRequest( req, res ){

      const tripData = {
        user_id: req.userData.id,
        origin: req.body.origin,
        destination: req.body.destination,
        dateOfTravel: req.body.date,
        dateOfReturn: req.body.returnDate,
        travelReason: req.body.travelReason,
        accommodation_id: req.body.accommodationID,
        type: req.tripType,
      };

      const trip = await tripService.createTrip(tripData);
      
      const tripRequest = {
        trip_id: trip.dataValues.id,
        user_id: req.userData.id,
        line_manager_id: req.manData.id,
        status: trip.dataValues.status,
      }
       await reqService.createTripReq(tripRequest);
      
      
      const message = `A ${req.tripType} was registered successfully.`;
  
      const data = {
        Name: req.userData.fullName,
        Email: req.userData.email,
        From: trip.dataValues.origin,
        Destination: trip.dataValues.destination,
        DateOfTravel: trip.dataValues.dateOfTravel,
        DateOfReturn: req.body.returnDate,
      };
      infoLogger(req, 200, message);
      util.setSuccess(200, message, data);
      return util.send(res);
  }

  static async getAllCities(req, res){
    const message = 'All cities supported by Barefoot Nomad';

    const data = await cityService.findAllCities();

    infoLogger(req, 200, message);
    util.setSuccess(200, message, data)
    return util.send(res);
  }
}

export default TripController;
