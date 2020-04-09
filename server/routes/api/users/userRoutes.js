import express from 'express';
import user from '../../../controllers/usercontroller';
import validate from '../../../middlewares/validators/validate';
import allow from '../../../middlewares/authorisation';

const router = express.Router();

/**
 * Public routes
 */
router.post('/signup', validate.signupValidate, user.signUp);
router.get(
  '/verify/:token',
  validate.verificationValidation,
  user.accountVerification,
);
router.post(
  '/signin',
  validate.validateSignInRequestData,
  validate.verifyUser,
  user.signIn,
);

/**
 * Restricted routes
 */
router.get('/', allow('Super Administrator'), user.read);
router.patch(
  '/:id',
  allow('Super Administrator'),
  validate.verifyResourceExists,
  user.update,
);

export default router;
