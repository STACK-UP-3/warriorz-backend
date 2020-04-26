import express from 'express';
import accomController from '../../../controllers/accomodationController';
import accommodationValidation from '../../../middlewares/validators/accommodation';
import { authorizationCheck } from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';

const router = express.Router();

router.get(
  '/user/accommodations',
  authorizationCheck,
  allow('Travel Administrator', 'Supplier'),
  accommodationValidation.accommodationQueryParamsValidate,
  accommodationValidation.accomPaginationByUserId,
  accomController.getAccommodationsCreatedByUser,
);

export default router;
