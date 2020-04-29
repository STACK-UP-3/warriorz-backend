import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import dotenv from 'dotenv';
import tripService from '../services/tripServices';
import reqService from '../services/tripReqService';
import cityService from '../services/cityService';
import pagination from '../helpers/paginationHelper';
import Util from '../helpers/util';
import { errorLogger }from '../helpers/loggerHandle';

const util = new Util();

dotenv.config();

class TripController {
  static async createTripRequest( req, res ){
    try{
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

      util.setSuccess(200, message, data);
      return util.send(res);
    
    } catch(error){
      const Error = `Internal Server Error + ${error}`;
      return errorLogger(req, 500, Error); 
    }
  }

  static async getAllCities(req, res){
    try{
    const message = 'All cities supported by Barefoot Nomad';

    const data = await cityService.findAllCities();
    
    util.setSuccess(200, message, data)
    return util.send(res);
    
     } catch(error){
      const Error = `Internal Server Error + ${error}`;
      return errorLogger(req, 500, Error);
      }
      
  }

  static async updateOpenTripDetails (req, res){
    try{
      const newTripData = {
        origin: req.body.origin,
        destination: req.body.destination,
        dateOfTravel: req.body.date,
        dateOfReturn: req.body.returnDate,
        travelReason: req.body.travelReason,
        accommodation_id: req.body.accommodationID,
    }

    const tripDetailsUpdater = await tripService.updateTrip(newTripData, { id: req.params.trip_id })
    const message = `The ${tripDetailsUpdater[1].dataValues.type} details were successfully updated`;
    const data = {
      Name: req.userData.fullName,
      Email: req.userData.email,
      From: tripDetailsUpdater[1].dataValues.origin,
      Destination: tripDetailsUpdater[1].dataValues.destination,
      DateOfTravel: tripDetailsUpdater[1].dataValues.dateOfTravel,
      DateOfReturn: req.body.returnDate,
      TravelReason: tripDetailsUpdater[1].dataValues.travelReason,
      accommodation_id: tripDetailsUpdater[1].dataValues.accommodation_id,
    }
    util.setSuccess(200, message, data)
    return util.send(res);

    } catch(error){
      const Error = `Internal Server Error + ${error}`;
      return errorLogger(req, 500, Error);
    }
    
}

static async viewAllTrips(req,res){
  try{
    const userSortedTrips = await reqService.findByProp(req.tripSortingData);
    const tripRequestsData = userSortedTrips.reverse();

    const data = pagination(req.query.page,req.query.limit,tripRequestsData,res);

    const message = 'All The Trips are: ';  
    util.setSuccess(200, message, data);
    return util.send(res);

  }catch(error){
      const Error = `Internal Server Error + ${error}`;
      return errorLogger(req, 500, Error);
    }
}

static async viewSpecificTrip(req,res){

    const data = req.specificTripData;
    const message = 'Here is the trip information that you requested: ';
    
    util.setSuccess(200, message, data);
    return util.send(res);

  }
}

export default TripController;
