import models from '../models';

const { accommodations } = models;

/**
 * @exports
 * @class accommodationService
 */

class accommodationService {
  /**
   * create new room
   * @static createroom
   * @param {object} newroom
   * @memberof accommodationservice
   * @returns {object} data
   */

  static createAccommodation(newAccommodation) {
    return accommodations.create(newAccommodation);
  }

  static findByProp(prop) {
    return accommodations.findAll({
      where: prop,
    });
  }
  
  static findAll() {
    return accommodations.findAll();
  }
}

export default accommodationService;
