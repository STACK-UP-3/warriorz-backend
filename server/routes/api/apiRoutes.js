import express from 'express';
import user from './users/userRoutes';
import funcRoute from './users/featuresRoute';

const router = express.Router();

router.use('/users', user);
router.use('/', funcRoute);

export default router;
