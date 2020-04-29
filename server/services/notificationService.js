/* eslint-disable consistent-return */
import {Op} from 'sequelize';
import models from '../models';

const { notifications } = models;

/**
 * @exports
 * @class notificationService
 */

class NotificationService {
  /**
   * create new trip
   * @static createNotification
   * @param {object} newNotification
   * @memberof notificationService
   * @returns {object} data
   */

  static createNotification(newNotification) {
    return notifications.create(newNotification);
  }

  static findAllNotifications(prop) {
    return notifications.findAll({
      where: prop,
    });
  }

  static findNotificationsByProps( { id , role } ){
    if ( role === 'Manager' ){
      return notifications.findAll({
        where: {
          [Op.or]: [ { line_manager_id : id}, { user_id: id} ],
        },
      });
    };
    
    return notifications.findAll({
      where: { user_id: id },
    });
  }

  static findOneNotification(prop) {
    return notifications.findOne({
      where: prop,
      include: ['notificationsTripRequest'],
    });
  }
}

export default NotificationService;
