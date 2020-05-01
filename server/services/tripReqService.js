import models from '../models';

const { triprequests } = models;

/**
 * @exports
 * @class TripsRequestService
 */

class TripsRequestService {
  /**
   * create new trip
   * @static createtrip
   * @param {object} newtrip
   * @memberof TripsrequestService
   * @returns {object} data
   */

  static createTripReq(newTrip) {
    return triprequests.create(newTrip);
  }

  static findByProp(prop) {
    return triprequests.findAll({
      where: prop,
      include: ['tripRequest'],
    });
  }

  static findOneEntry(prop) {
    return triprequests.findOne({
      where: prop,
      include: ['tripRequest'],
    });
  }

  static updateAtt(set, prop) {
    return triprequests.update(set, {
      where: prop,
    });
  }
}

export default TripsRequestService;
