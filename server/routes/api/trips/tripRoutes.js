import express from 'express';
import tripController from '../../../controllers/tripController';
import {tripValidation, cityAndDateCheck,tripTypeCheck} from "../../../middlewares/validators/tripValidate";
import {authorizationCheck, findManagerByUserID } from '../../../middlewares/authorization';

const router = express.Router();

router.post('/', [ authorizationCheck, findManagerByUserID ,tripValidation, cityAndDateCheck, tripTypeCheck ], tripController.createTripRequest);
router.get('/cities', authorizationCheck, tripController.getAllCities);

export default router;
