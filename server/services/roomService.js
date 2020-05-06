import models from '../models';

const { rooms } = models;

/**
 * @exports
 * @class RoomService
 */

class RoomService {
  /**
   * create new room
   * @static createroom
   * @param {object} newroom
   * @memberof RoomService
   * @returns {object} data
   */

  static createRoom(newRoom) {
    return rooms.create(newRoom);
  }

  static findByProp(prop) {
    return rooms.findAll({
      where: prop,
    });
  }

  static updateAtt(set, prop) {
    return rooms.update(set, {
      where: prop,
    });
  }
}

export default RoomService;
