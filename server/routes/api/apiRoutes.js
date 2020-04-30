import express from 'express';
import user from './users/userRoutes';
import trips from './trips/tripRoutes';
import funcRoute from './users/featuresRoute';
import rolesApiRouter from './roles/Router';
import accommRouter from './accommodations/accommRoute';

const router = express.Router();

router.use('/users', user);
router.use('/trips', trips);
router.use('/', funcRoute);
router.use('/users', user);
router.use('/roles', rolesApiRouter);
router.use('/accommodations', accommRouter);

export default router;
