import models from '../models';

const { comment } = models;

/**
 * @exports
 * @class CommentThreadService
 */

class CommentService {
  /**
   * create new comment
   * @static createuser
   * @param {object} newComent
   * @memberof commentservice
   * @returns {object} data
   */

  static createComment(Comment) {
    return comment.create(Comment);
  }

  static findByProp(prop) {
    return comment.findAll({
      where: prop,
    });
  }

  static delete(id){
    return comment.destroy({
      where: id,
    })
  }
}

export default CommentService;
