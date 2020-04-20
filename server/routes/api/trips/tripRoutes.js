import express from 'express';
import tripController from '../../../controllers/tripController';
import tripValidations from '../../../middlewares/validators/tripValidate';
import { tripVerification } from '../../../middlewares/verifications/tripVerification';
import {authorizationCheck, findManagerByUserID } from '../../../middlewares/authorization';

const router = express.Router();

router.post('/', 
[ authorizationCheck, findManagerByUserID ,
  tripValidations.createTripJoiValidation, 
  tripValidations.createTripCityAndDateCheck, 
  tripValidations.createTripTypeCheck ], 
tripController.createTripRequest );

router.get( '/cities', authorizationCheck, tripController.getAllCities );

router.patch('/:trip_id', 
[authorizationCheck, 
 tripValidations.updateTripJoiValidation, 
 tripVerification, 
 tripValidations.checkOpenTripCityAndDATE], 
tripController.updateOpenTripDetails );

export default router;
