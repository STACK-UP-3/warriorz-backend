/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import NotificationService from '../services/notificationService';
import userService from '../services/userService';
import sendEmail from '../services/email.create';
import emailTemplate from '../services/templates/notificationEmail';

export default async(notificationData,userId,emailContent,emit)=>{

     const userEmailNotification = await userService.findById(userId);
     const managerEmailNotification = await userService.findById(notificationData.line_manager_id);

        if(userEmailNotification.dataValues.emailNotification === true){
            const fullName = `${userEmailNotification.dataValues.firstname} ${userEmailNotification.dataValues.lastname}`;
            sendEmail(
            emailTemplate(fullName,emailContent.userMessage),
            emailContent.subject,
            userEmailNotification.email,
        );
            notificationData.emailSent = true ;

        }

        if(managerEmailNotification.emailNotification === true){
            const fullName = `${managerEmailNotification.firstname} ${managerEmailNotification.lastname}`;
            sendEmail(
            emailTemplate(fullName,emailContent.managerMessage),
            emailContent.subject,
            managerEmailNotification.email,
        );
            notificationData.managerEmailSent = true ;
        }

       const notification = await NotificationService.createNotification(notificationData);
        emit.io.emit('new-notification', notification.dataValues);

}
