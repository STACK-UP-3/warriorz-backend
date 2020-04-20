import models from '../models';

const { trips } = models;

/**
 * @exports
 * @class TripsService
 */

class TripsService {
  /**
   * create new trip
   * @static createtrip
   * @param {object} newtrip
   * @memberof TripsService
   * @returns {object} data
   */

  static createTrip(newTrip) {
    return trips.create(newTrip);
  }
  
  static findByProp(prop) {
    return trips.findAll({
      where: prop,
    });
  }

  static updateTrip(set, prop) {
    return trips.update(set, {
      where: prop,
      returning: true,
      plain: true,
    });
  }

}

export default TripsService;
