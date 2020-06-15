import express from 'express';
import user from '../../../controllers/usercontroller';
import Social from '../../../controllers/socialOauth';
import validate from '../../../middlewares/validators/validate';
import allow from '../../../middlewares/roleAuthorisation';
import { authorizationCheck } from '../../../middlewares/authorization';
import passport from '../../../config/passport';
import AuthValidator from '../../../middlewares/validators/AuthValidator';

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
router.get('/', authorizationCheck, allow('Super Administrator'), user.read);
router.patch(
  '/:id',
  authorizationCheck,
  allow('Super Administrator'),
  validate.verifyResourceExists,
  user.update,
);
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
router.get(
  '/tokenAuth/:token',
  validate.VerifyToken,
  user.signIn,
)
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/auth/google/redirect',
  passport.authenticate('google'),
  Social.Oauth,
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);
router.get(
  '/auth/facebook/redirect',
  passport.authenticate('facebook'),
  Social.Oauth,
);

// https://stackoverflow.com/questions/3521290/logout-get-or-post
router.post(
  '/logout',
  AuthValidator.requestTokenExists,
  AuthValidator.verifyToken,
  AuthValidator.userTokenExists,
  user.signOut,
);

export default router;
