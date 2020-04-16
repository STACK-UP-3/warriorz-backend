import express from 'express';
import user from '../../../controllers/usercontroller';
import validate from '../../../middlewares/validators/validate';
import UserVerification from '../../../middlewares/verifications/verifyUser';
import { authorizationCheck } from '../../../middlewares/authorization';


const router = express.Router();

router.post(
  '/password/forgot',
  validate.forgotPasswordDataValidate,
  UserVerification.checkUserByEmail,
  user.sendResetPasswordEmail,
);
router.patch(
  '/password/reset/:token',
  validate.resetPasswordDataValidate,
  UserVerification.checkUserByEmail,
  user.resetPassword,
);
router.patch(
  '/profile',
  authorizationCheck,
  UserVerification.checkUserById,
  validate.profileUpdateValidate,
  user.updateUserProfile,
);
router.get(
  '/profile',
  authorizationCheck,
  UserVerification.checkUserById,
  user.getUserProfile,
);

export default router;
