/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Util from '../../helpers/util';
import { Comment } from '../../helpers/validateSchema';
import { errorLogger }from '../../helpers/loggerHandle';
import CommentService from '../../services/commentThread';
import tripReqService from '../../services/tripReqService';
import { JoiErrorHandler} from '../../services/templates/TripsErrorTemplate';

const util = new Util();

dotenv.config();


export default class CommentValidations{

    static async createCommentJoiValidation(req, res, next){

        const { error } = Comment.validate(req.body);
        JoiErrorHandler(req, res, next ,error);

    }

    static async CheckCommentId(req, res, next){
        const id = req.params.comment_id;
        let Error;

        if(isNaN(id)){
            Error = 'Invalid Comment Id';
            errorLogger(req, 400, Error);
            util.setError(400, Error);
            return util.send(res);            
        }

        const comment = await CommentService.findByProp({ id })

        if(!comment[0]){
            Error = 'Comment NotFound';
            errorLogger(req, 404, Error);
            util.setError(404, Error);
            return util.send(res);
        }

        if(comment[0].dataValues.author_id !== req.userData.id){
            Error = 'This Comment is not Yours, To Edit';
            errorLogger(req, 403, Error);
            util.setError(403, Error);
            return util.send(res);
        }
     
        next();
    }

    static async checkTripRequest (req,res,next){
        const id = req.params.trip_id;
        let Error;

        if(isNaN(id)){
            Error = 'Invalid trip Request Id';
            errorLogger(req, 400, Error);
            util.setError(400, Error);
            return util.send(res);            
        }

        const tripRequest = await tripReqService.findByProp({ id })

        if(!tripRequest[0]){
            Error = 'Trip Request NotFound';
            errorLogger(req, 404, Error);
            util.setError(404, Error);
            return util.send(res);
        }

        next();
     }
  
}
