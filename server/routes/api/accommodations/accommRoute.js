

import express from 'express';
import accomController from '../../../controllers/accomodationController';
import accommodationValidation from '../../../middlewares/validators/accommodation';
import { authorizationCheck } from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';
import BookingVarification from '../../../middlewares/verifications/accommodationBookingsVerify';

const router = express.Router();

router.post(
  '/',
  authorizationCheck,
  allow('Travel Administrator', 'Supplier'),
  accommodationValidation.validateAccommodationData,
  accomController.createAccommodation,
);

router.get(
  '/',
  authorizationCheck,
  allow('Travel Administrator', 'Supplier', 'Requester'),
  accommodationValidation.accommodationQueryParamsValidate,
  accommodationValidation.allAccomPagination,
  accomController.getAllAccommodations,
);

router.get(
  '/:id',
  authorizationCheck,
  allow('Travel Administrator', 'Supplier','Requester'), 
  accommodationValidation.validateIdFromParams,
  accommodationValidation.checkAccommodationExist,
  accomController.getSpecificAccomDetails,
);

router.post(
  '/bookings',
  authorizationCheck,
  allow('Requester'),
  accommodationValidation.validateBookingData,
  accommodationValidation.validateDates,
  BookingVarification.verifyBookingAvailablity,
  accomController.bookAccommodation,
);

export default router;
