import 'dotenv/config';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';

import RoleService from '../services/RoleService';
import Util from '../helpers/util';

const util = new Util();

export default class RoleController {
  static async create(req, res) {
    let data = null;
    // Setup a new Role object
    const newRole = {
      name: req.body.name,
      permissions: req.body.permissions,
    };

    // Save the Role object to database storage
    const queryResult = await RoleService.createRole(newRole);
    // Setup data object to be returned
    data = {
      name: queryResult.dataValues.name,
      permissions: queryResult.dataValues.permissions,
    };

    // Return API response
    util.setSuccess(201, 'Role created successfully', data);
    return util.send(res);
  }

  static async read(req, res) {
    // Get all Role instances from database storage
    const queryResult = await RoleService.getRoles();
    // Setup data object to be returned
    const data = queryResult.map((item) => item.dataValues);
    // Return API response
    util.setSuccess(200, 'Roles retrieved successfully', data);
    return util.send(res);
  }

  static async readOne(req, res) {
    // Get required data from request parameters
    const { id } = req.params;
    // Get a single Role instance from database storage
    const queryResult = await RoleService.findById(id);
    // Setup data object to be returned
    const data = queryResult.dataValues;
    // Return API response
    util.setSuccess(200, 'Role retrieved successfully', data);
    return util.send(res);
  }

  static async update(req, res) {
    // Get required data from request parameters
    const { id } = req.params;
    // Get a single Role instance from database storage
    await RoleService.updateRole(req.body, { id });
    // Return API response
    util.setSuccess(200, 'Role updated successfully');
    return util.send(res);
  }

  static async delete(req, res) {
    // Get required data from request parameters
    const { id } = req.params;
    // Delete a single Role instance from database storage
    await RoleService.deleteRole({ id });
    // Return API response
    util.setSuccess(200, 'Role deleted successfully');
    return util.send(res);
  }
}
