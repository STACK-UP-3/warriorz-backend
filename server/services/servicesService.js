import models from '../models';

const { services } = models;

/**
 * @exports
 * @class ServicesService
 */

class ServicesService {
  /**
   * create new service
   * @static createservice
   * @param {object} newservice
   * @memberof ServicesService
   * @returns {object} data
   */

  static createService(newService) {
    return services.create(newService);
  }

  static findByProp(prop) {
    return services.findAll({
      where: prop,
    });
  }
}

export default ServicesService;
