import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import dotenv from 'dotenv';
import Util from '../helpers/util';
import CommentService from '../services/commentThread';
import { errorLogger }from '../helpers/loggerHandle';

const util = new Util();

dotenv.config();

class CommentController {

    static async create(req,res){
        try{
            const { content } = req.body;

            const newComment = await CommentService.createComment({
                trip_request_id:req.params.trip_id,
                author_id: req.userData.id,
                auxiliary_id: req.manData.id,
                content,
            });
            
            const message = 'A new Comment Was Sucessfully Created';
            
            util.setSuccess(201, message, newComment);
            return util.send(res);

        }catch(error){

            const Error = `Internal Server Error + ${error}`;
            return errorLogger(req, 500, Error); 

        }
    }

    static async delete(req,res){
        try{
            const id = req.params.comment_id;

            const Comment = await CommentService.delete({ id })
            
            const message = 'The Comment Was Sucessfully Deleted';
            
            util.setSuccess(200, message, Comment);
            return util.send(res);

        }catch(error){

            const Error = `Internal Server Error + ${error}`;
            return errorLogger(req, 500, Error); 

        }
    }

}

export default CommentController;
