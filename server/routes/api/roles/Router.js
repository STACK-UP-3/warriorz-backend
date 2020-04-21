import express from 'express';
import allow from '../../../middlewares/roleAuthorisation';
import RoleValidator from '../../../middlewares/validators/RoleValidator';
import RoleController from '../../../controllers/RoleController';
import { authorizationCheck } from '../../../middlewares/authorization';

const router = express.Router();

router.post(
  '/',
  authorizationCheck,
  allow('Super Administrator'),
  RoleValidator.validateRequestInput,
  RoleValidator.verifyUniqueRole,
  RoleController.create,
);
router.get('/', authorizationCheck,allow('Super Administrator'), RoleController.read);
router.get(
  '/:id',
  authorizationCheck,
  allow('Super Administrator'),
  RoleValidator.verifyRoleExists,
  RoleController.readOne,
);
router.patch(
  '/:id',
  authorizationCheck,
  allow('Super Administrator'),
  RoleValidator.validateRequestInput,
  RoleValidator.verifyRoleExists,
  RoleController.update,
);
router.delete(
  '/:id',
  authorizationCheck,
  allow('Super Administrator'),
  RoleValidator.verifyRoleExists,
  RoleController.delete,
);

export default router;
