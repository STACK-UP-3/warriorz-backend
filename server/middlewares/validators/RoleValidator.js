import joi from '@hapi/joi';

import RoleService from '../../services/RoleService';
import Util from '../../helpers/util';

const util = new Util();

export default class RoleValidator {
  static async validateRequestInput(req, res, next) {
    const { name } = req.body;

    const { error } = joi
      .object({ name: joi.string().required() })
      .validate({ name });

    if (error) {
      const message = error.details[0].message
        .replace('/', '')
        .replace(/"/g, '');
      util.setError(400, message);
      return util.send(res);
    }

    return next();
  }

  static async verifyUniqueRole(req, res, next) {
    // Get model identifier from request parameters
    const { name } = req.body;

    // check database for existence
    const exists = await RoleService.findByName(name);

    if (!exists) {
      return next();
    }

    util.setError(409, `Role with name '${name}' already exists`);
    return util.send(res);
  }

  static async verifyRoleExists(req, res, next) {
    // Get model identifier from request parameters
    const { id } = req.params;

    // check database for existence
    const exists = await RoleService.findById(id);

    if (!exists) {
      util.setError(404, `Role with id ${id} does not exist`);
      return util.send(res);
    }

    return next();
  }
}
