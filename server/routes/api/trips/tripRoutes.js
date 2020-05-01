import express from 'express';
import tripController from '../../../controllers/tripController';
import tripValidations from '../../../middlewares/validators/tripValidate';
import {
  tripVerification,
  specificVerification,
  tripRequestVerification,
} from '../../../middlewares/verifications/tripVerification';
import {
  authorizationCheck,
  findManagerByUserID,
} from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';

const router = express.Router();

router.post(
  '/',
  [
    authorizationCheck,
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
  authorizationCheck,
  allow('Requester', 'Manager'),
  tripController.getAllCities,
);

router.patch(
  '/:trip_id',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    tripValidations.updateTripJoiValidation,
    tripVerification,
    tripValidations.checkOpenTripCityAndDATE,
  ],
  tripController.updateOpenTripDetails,
);

router.get(
  '/',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    tripValidations.requestQueryValidation,
    tripValidations.userTripsSorting,
  ],
  tripController.viewAllTrips,
);

router.get(
  '/assigned',
  [
    authorizationCheck,
    allow('Manager'),
    tripValidations.requestQueryValidation,
    tripValidations.managerTripsSorting,
  ],
  tripController.viewAllTrips,
);

router.get(
  '/:trip_id',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    tripValidations.tripIdValidation,
    specificVerification,
  ],
  tripController.viewSpecificTrip,
);

router.patch(
  '/requests/:id',
  authorizationCheck,
  allow('Manager'),
  tripValidations.validateApproveData,
  tripRequestVerification,
  tripController.approveRejectTripRequest,
);

export default router;
