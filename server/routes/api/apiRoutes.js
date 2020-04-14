import express from 'express';
import user from './users/userRoutes';
import trips from './trips/tripRoutes';
import funcRoute from './users/featuresRoute';

const router = express.Router();

router.use('/users',user);
router.use('/trips', trips);
router.use('/', funcRoute);

export default router;
