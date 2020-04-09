import express from 'express';
import tripController from '../../../controllers/tripController';
import tripValidations from '../../../middlewares/validators/tripValidate';
import { tripVerification } from '../../../middlewares/verifications/tripVerification';
import {
  authorizationCheck,
  findManagerByUserID,
} from '../../../middlewares/authorization';
import allow from '../../../middlewares/authorisation';

const router = express.Router();

router.post(
  '/',
  [
    allow('Requester', 'Manager'),
    findManagerByUserID,
    tripValidations.createTripJoiValidation,
    tripValidations.createTripCityAndDateCheck,
    tripValidations.createTripTypeCheck,
  ],
  tripController.createTripRequest,
);

router.get(
  '/cities',
  allow('Requester', 'Manager'),
  tripController.getAllCities,
);

router.patch(
  '/:trip_id',
  [
    allow('Requester', 'Manager'),
    authorizationCheck,
    tripValidations.updateTripJoiValidation,
    tripVerification,
    tripValidations.checkOpenTripCityAndDATE,
  ],
  tripController.updateOpenTripDetails,
);

export default router;
