import express from 'express';
import user from '../../../controllers/usercontroller';
import validate from '../../../middlewares/validators/validate';
import UserVerification from '../../../middlewares/verifications/verifyUser';

const router = express.Router();

router.post(
  '/password/forgot',
  validate.forgotPasswordDataValidate,
  UserVerification.checkUserByEmail,
  UserVerification.isAccountVerified,
  user.sendResetPasswordEmail,
);
router.patch(
  '/password/reset/:token',
  validate.resetPasswordDataValidate,
  UserVerification.checkUserByEmail,
  UserVerification.isAccountVerified,
  user.resetPassword,
);

export default router;
