import models from '../models';

const { users } = models;

/**
 * @exports
 * @class UserService
 */

class UserService {
  /**
   * create new user
   * @static createuser
   * @param {object} newuser
   * @memberof userService
   * @returns {object} data
   */

  static createuser(newUser) {
    return users.create(newUser);
  }

  static findByProp(prop) {
    return users.findAll({
      where: prop,
    });
  }

  static updateAtt(set, prop) {
    return users.update(set, {
      where: prop,
    });
  }

  static getUsers() {
    return users.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByEmail(prop) {
    return users.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return users.findOne({
      where: { id: modelId },
    });
  }
}

export default UserService;
