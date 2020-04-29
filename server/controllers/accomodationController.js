import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import dotenv from 'dotenv';
import Util from '../helpers/util';
import accommodationHandler from '../helpers/accommodationHelper';

const util = new Util();

dotenv.config();

class Accommodations {
  static async createAccommodation(req, res) {
    const newAccommodation = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      owner: req.body.owner,
      status: req.body.status,
      cost: req.body.cost,
      user_id: req.userData.id,
    };

    const createdAccommodation = await accommodationHandler.createAccommodation(
      newAccommodation,
    );
    const accommodationId = createdAccommodation.id;
    const createdServices = await accommodationHandler.createServices(
      req.body.services,
      accommodationId,
    );
    const createdRooms = await accommodationHandler.createRooms(
      req.body.rooms,
      accommodationId,
    );
    const createdImages = await accommodationHandler.storeImages(
      req.body.images,
      accommodationId,
      'accommodation',
    );

    const message = 'Accommodation created successfully';
    util.setSuccess(201, message, {
      ...createdAccommodation,
      services: createdServices,
      images: createdImages,
      rooms: createdRooms,
    });
    return util.send(res);
  }

  static async getAllAccommodations(req, res) {
    const accommodations = await accommodationHandler.getFormatedAccommodations(
      req.accommodations,
    );
    const responseData = {
      pageInformation: req.accommodations.pageInformation,
      previousPage: req.accommodations.previousPage,
      nextPage: req.accommodations.nextPage,
      result: accommodations,
    };
    const message = 'Accommodations retrieved successfully';
    util.setSuccess(200, message, responseData);
    return util.send(res);
  }

  static async getSpecificAccomDetails(req, res) {
    const { accommodation } = req;
    const detailedAccommodation = await accommodationHandler.formatAccommodationResponse(
      accommodation[0].dataValues,
    );
    const message = 'Accommodation retrieved successfully';
    util.setSuccess(200, message, detailedAccommodation);
    return util.send(res);
  }
}

export default Accommodations;
