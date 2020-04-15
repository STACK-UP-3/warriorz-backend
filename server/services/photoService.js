import models from '../models';

const { photos } = models;

/**
 * @exports
 * @class PhotoService
 */

class PhotoService {
  /**
   * create new photo
   * @static createphoto
   * @param {object} newphoto
   * @memberof photoService
   * @returns {object} data
   */

  static createphoto(newphoto) {
    return photos.create(newphoto);
  }

  /**
   * find photo url
   * @static findPhoto
   * @param {object} prop
   * @memberof PhotoService
   * @returns {object} data
   */

  static findByProp(prop) {
    return photos.findAll({
      where: prop,
    });
  }

  static updatePhoto(set, prop) {
    return photos.update(set, {
      where: prop,
    });
  }
}

export default PhotoService;
