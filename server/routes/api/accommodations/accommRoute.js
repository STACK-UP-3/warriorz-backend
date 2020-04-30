import express from 'express';
import accomController from '../../../controllers/accomodationController';
import accommodationValidation from '../../../middlewares/validators/accommodation';
import { authorizationCheck } from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';

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
  allow('Travel Administrator', 'Supplier'),
  accommodationValidation.validateIdFromParams,
  accommodationValidation.checkAccommodationExist,
  accomController.getSpecificAccomDetails,
);

export default router;
