/* eslint-disable consistent-return */
import tripService from '../../services/tripServices';
import reqService from '../../services/tripReqService';
import Util from '../../helpers/util';
import { debugLogger }from '../../helpers/loggerHandle';

const util = new Util();

export const tripVerification = async(req, res, next) =>{
    const oldTripDetails = await tripService.findByProp({id: req.params.trip_id});

    if(!oldTripDetails[0]){
      const Error = 'This trip is not found in the database.';
        debugLogger(req, 404, Error);
        util.setError(404, Error);
        return util.send(res);
    }
  
    const tripStatus = await reqService.findByProp({trip_id: req.params.trip_id});
    
    if(oldTripDetails[0].dataValues.user_id !== req.userData.id){
      const Error = 'Unauthorised Access: Dear user this trip does not belong to you.';
        debugLogger(req, 401, Error);
        util.setError(401, Error);
        return util.send(res);
    }

    if(tripStatus[0].dataValues.status !== 'pending'){
      const Error = 'This is not an open trip request.';
      debugLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    next();
}
