import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import dotenv from 'dotenv';
import notificationsService from '../services/notificationService';
import pagination from '../helpers/paginationHelper';
import Util from '../helpers/util';
import { debugLogger }from '../helpers/loggerHandle';

const util = new Util();
dotenv.config();

class NotificationsController {
static async viewAllNotifications(req,res){
  try{
    const notifications = await notificationsService.findNotificationsByProps( req.userData );

    const notificationsData = notifications.reverse();
    const data = pagination(req.query.page,req.query.limit,notificationsData,res);
    const message = 'All the notifications: ';

    util.setSuccess(200, message, data);
    return util.send(res);

  }catch(error){
      const Error = `Internal Server Error + ${error}`;
      return debugLogger(req, 500, Error);
    }
}

static async viewSpecificNotification(req,res){

        const notification = await notificationsService.findOneNotification( { id: req.notificationId } );

        const message = 'Here is the notification that you requested: ';
        
        util.setSuccess(200, message, notification.dataValues);
        return util.send(res);    
  }
}

export default NotificationsController;
