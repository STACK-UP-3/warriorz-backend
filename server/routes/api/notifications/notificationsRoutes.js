import express from 'express';
import tripValidations from '../../../middlewares/validators/tripValidate'
import notificationsController from '../../../controllers/notificationsController';
import { authorizationCheck } from '../../../middlewares/authorization';
import { notificationIDVerification } from '../../../middlewares/verifications/notificationVer';
import allow from '../../../middlewares/roleAuthorisation';

const router = express.Router();

router.get('/',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    tripValidations.requestQueryValidation,
  ],
  notificationsController.viewAllNotifications,
);

router.get('/:notification_id', 
    [
     authorizationCheck,
     allow('Requester', 'Manager'),
     tripValidations.tripIdValidation,
     notificationIDVerification,

    ],
   notificationsController.viewSpecificNotification,
);

export default router;
