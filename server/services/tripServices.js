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

}

export default TripsService;
