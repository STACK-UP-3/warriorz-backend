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
  '/:id',
  authorizationCheck,
  allow('Travel Administrator', 'Supplier'),
  accommodationValidation.validateIdFromParams,
  accommodationValidation.checkAccommodationExist,
  accomController.getSpecificAccomDetails,
);

router.get(
  '/city/accommodations/:city',
  authorizationCheck,
  allow('Requester'),
  accommodationValidation.accommodationQueryParamsValidate,
  accommodationValidation.checkAccommodationExistByCity,
  accommodationValidation.accomPaginationByCity,
  accomController.getAccommodationsForRequester,
);

router.get(
  '/',
  authorizationCheck,
  allow('Travel Administrator'),
  accommodationValidation.accommodationQueryParamsValidate,
  accommodationValidation.allAccomPagination,
  accomController.getAllAccommodations,
);

export default router;
