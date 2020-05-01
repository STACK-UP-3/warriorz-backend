/* eslint-disable consistent-return */
import tripService from '../../services/tripServices';
import reqService from '../../services/tripReqService';
import Util from '../../helpers/util';
import { debugLogger } from '../../helpers/loggerHandle';

const util = new Util();

export const tripVerification = async (req, res, next) => {
  const oldTripDetails = await tripService.findByProp({
    id: req.params.trip_id,
  });

  if (!oldTripDetails[0]) {
    const Error = 'This trip is not found in the database.';
    debugLogger(req, 404, Error);
    util.setError(404, Error);
    return util.send(res);
  }

  const tripStatus = await reqService.findByProp({
    trip_id: req.params.trip_id,
  });

  if (oldTripDetails[0].dataValues.user_id !== req.userData.id) {
    const Error =
      'Unauthorised Access: Dear user this trip does not belong to you.';
    debugLogger(req, 401, Error);
    util.setError(401, Error);
    return util.send(res);
  }

  if (tripStatus[0].dataValues.status !== 'pending') {
    const Error = 'This is not an open trip request.';
    debugLogger(req, 400, Error);
    util.setError(400, Error);
    return util.send(res);
  }

  next();
};

export const specificVerification = async (req, res, next) => {
  const tripRequested = await reqService.findOneEntry({
    trip_id: req.params.trip_id,
  });
  if (!tripRequested) {
    const Error = 'This trip is not found in the database.';
    debugLogger(req, 404, Error);
    util.setError(404, Error);
    return util.send(res);
  }

  if (req.userData.role === 'Manager') {
    if (
      tripRequested.dataValues.line_manager_id !== req.userData.id &&
      tripRequested.dataValues.user_id !== req.userData.id
    ) {
      const Error = 'Unauthorised Access: This trip does not belong to you.';
      debugLogger(req, 401, Error);
      util.setError(401, Error);
      return util.send(res);
    }

    if (tripRequested.dataValues.line_manager_id === req.userData.id) {
      req.specificTripData = tripRequested;
      return next();
    }
  }

  if (tripRequested.dataValues.user_id !== req.userData.id) {
    const Error =
      'Unauthorised Access: Dear user this trip does not belong to you.';
    debugLogger(req, 401, Error);
    util.setError(401, Error);
    return util.send(res);
  }

  req.specificTripData = tripRequested;
  next();
};

export const tripRequestVerification = async (req, res, next) => {
  const tripRequest = await reqService.findByProp({
    id: req.body.requestId,
    line_manager_id: req.userData.id,
  });

  if (!tripRequest[0]) {
    const Error = `Trip request ${req.body.requestId} for you not found`;
    debugLogger(req, 404, Error);
    util.setError(404, Error);
    return util.send(res);
  }
  next();
};
