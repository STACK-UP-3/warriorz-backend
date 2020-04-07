import models from '../models';

const { usermanagements } = models;

/**
 * @exports
 * @class UserService
 */

class ManagementService {
  static findByProp(prop){
    return usermanagements.findAll({
      where: prop,
    });
  };

}

export default ManagementService;
