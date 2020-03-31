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

  /**
   * find user
   * @static findUser
   * @param {object} prop
   * @memberof UserService
   * @returns {object} data
   */
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

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByLogin(prop) {
    return users.findOne({
      where: prop,
    });
  }
}

export default UserService;
