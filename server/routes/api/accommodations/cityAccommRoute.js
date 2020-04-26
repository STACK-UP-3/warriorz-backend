import express from 'express';
import accomController from '../../../controllers/accomodationController';
import accommodationValidation from '../../../middlewares/validators/accommodation';
import { authorizationCheck } from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';

const router = express.Router();

router.get(
    '/city/accommodations/:city',
    authorizationCheck,
    allow('Requester'),
    accommodationValidation.accommodationQueryParamsValidate,
    accommodationValidation.checkAccommodationExistByCity,
    accommodationValidation.accomPaginationByCity,
    accomController.getAccommodationsForRequester,
  );

export default router;
