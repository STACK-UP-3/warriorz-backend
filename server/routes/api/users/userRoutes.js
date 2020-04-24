import express from 'express';
import user from "../../../controllers/usercontroller";
import validate from "../../../middlewares/validators/validate";
import passport from '../../../config/passport';
import allow from '../../../middlewares/authorisation'

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
router.get('/verify/:token',validate.verificationValidation,user.accountVerification);
router.post('/signin',validate.validateSignInRequestData,validate.verifyUser,user.signIn);
router.get('/verify/:token', validate.verificationValidation,user.accountVerification);

router.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));
router.get("/auth/google/redirect",passport.authenticate('google'),user.Oauth)

router.get("/auth/facebook",passport.authenticate('facebook',{scope:['email']}));
router.get("/auth/facebook/redirect",passport.authenticate('facebook'),user.Oauth)


export default router;
