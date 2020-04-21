import express from 'express';

import allow from '../../../middlewares/authorisation';
import RoleValidator from '../../../middlewares/validators/RoleValidator';
import RoleController from '../../../controllers/RoleController';

const router = express.Router();

router.post(
  '/',
  allow('Super Administrator'),
  RoleValidator.validateRequestInput,
  RoleValidator.verifyUniqueRole,
  RoleController.create,
);
router.get('/', allow('Super Administrator'), RoleController.read);
router.get(
  '/:id',
  allow('Super Administrator'),
  RoleValidator.verifyRoleExists,
  RoleController.readOne,
);
router.patch(
  '/:id',
  allow('Super Administrator'),
  RoleValidator.validateRequestInput,
  RoleValidator.verifyRoleExists,
  RoleController.update,
);
router.delete(
  '/:id',
  allow('Super Administrator'),
  RoleValidator.verifyRoleExists,
  RoleController.delete,
);

export default router;
