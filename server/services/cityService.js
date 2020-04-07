import models from '../models';

const { cities } = models;

/**
 * @exports
 * @class CitiesService
 */

class CitiesService {

  static findByProp(prop){
    return cities.findAll({
      where: prop,
    });
  };

  static findAllCities(){
    return cities.findAll();
  }

}

export default CitiesService;
