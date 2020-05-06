import express from 'express';
import CommentController from '../../../controllers/commentThread'
import CommentValidations from '../../../middlewares/validators/commentValidator';
import { authorizationCheck,findManagerByUserID } from '../../../middlewares/authorization';
import allow from '../../../middlewares/roleAuthorisation';

const router = express.Router();

router.post(
  '/:trip_id',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    findManagerByUserID,
    CommentValidations.checkTripRequest,
    CommentValidations.createCommentJoiValidation,
  ],
  CommentController.create,
);

router.delete(
  '/:trip_id/:comment_id',
  [
    authorizationCheck,
    allow('Requester', 'Manager'),
    authorizationCheck,
    CommentValidations.checkTripRequest,
    CommentValidations.CheckCommentId,
  ],
  CommentController.delete,
);

export default router;
