/* eslint-disable consistent-return */
import notificationService from '../../services/notificationService';
import Util from '../../helpers/util';
import { debugLogger }from '../../helpers/loggerHandle';

const util = new Util();

export const notificationIDVerification = async(req, res, next) =>{
        const notificationRequested = await notificationService.findAllNotifications({ id: req.params.notification_id });
        
        if(!notificationRequested[0]){
          const Error = 'This notification is not found in the database.';
            debugLogger(req, 404, Error);
            util.setError(404, Error);
            return util.send(res);
        }
      
        if(req.userData.role === 'Manager'){
          if(notificationRequested[0].dataValues.line_manager_id !== req.userData.id && notificationRequested[0].dataValues.user_id !== req.userData.id){
            const Error = 'Unauthorised Access: This notification does not belong to you.';
              debugLogger(req, 401, Error);
              util.setError(401, Error);
              return util.send(res);
          }
            req.notificationId = notificationRequested[0].dataValues.id; 
            
            return next();

        }
        
        if(notificationRequested[0].dataValues.user_id !== req.userData.id){
          const Error = 'Unauthorised Access: Dear user this notification does not belong to you.';
            debugLogger(req, 401, Error);
            util.setError(401, Error);
            return util.send(res);
        }
        req.notificationId = notificationRequested[0].dataValues.id; 

        next();
};
