import express from 'express';
import user from "../../../controllers/usercontroller";
import validate from "../../../middlewares/validators/validate";

const router = express.Router();

router.post('/signup', validate.signupValidate, user.signUp);
router.get('/verify/:token', validate.verificationValidation,user.accountVerification);

export default router;
