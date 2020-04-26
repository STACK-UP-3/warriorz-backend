/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import {
  accommodationValidateSchema,
  queryParamsValidateSchema,
  idValidateSchema,
} from '../../helpers/validateSchema';
import Util from '../../helpers/util';
import { errorLogger } from '../../helpers/loggerHandle';
import filteredAccommodation from '../../helpers/accommodationFilter';
import accommodationService from '../../services/accommodationService';
import cityService from '../../services/cityService';
import pagination from '../../helpers/paginationHelper';

const util = new Util();

dotenv.config();

export default class accommodationValidation {
  static async checkAccommodationExist(req, res, next) {
    const { id } = req.params;
    const accommodation = await accommodationService.findByProp({
      id,
      user_id: req.userData.id,
    });
    if (!accommodation[0]) {
      const messege = `Accommodation ${id} not found for this user`;
      util.setError(404, messege);
      errorLogger(req, 404, messege);
      return util.send(res);
    }
    req.accommodation = accommodation;
    return next();
  }

  static async checkAccommodationExistByCity(req, res, next) {
    const { city } = req.params;
    const accommodations = await accommodationService.findByProp({
      location: city,
    });
    if (!accommodations[0]) {
      req.accommodations = [];
      return next();
    }
    req.accommodations = accommodations;
    return next();
  }

  static async validateAccommodationData(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      const Error = 'The data can not be empty!';
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    const accAlredyExist = await accommodationService.findByProp({
      name: req.body.name,
    });
    if (accAlredyExist[0]) {
      const Error =
        'Accommodation with the same name already exist, Please use another name';
      errorLogger(req, 409, Error);
      util.setError(409, Error);
      return util.send(res);
    }

    const { error } = accommodationValidateSchema.validate(
      filteredAccommodation(req.body),
    );
    if (error) {
      if (
        error.details[0].message
          .replace('/', '')
          .replace(/"/g, '')
          .includes('fails to match the required')
      ) {
        const Error = 'Incorrect use of special characters';

        errorLogger(req, 400, Error);
        util.setError(400, Error);
        return util.send(res);
      }

      const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    const accommodationCity = await cityService.findByProp({
      city: req.body.location,
    });

    if (!accommodationCity[0]) {
      const Error = `The location ${req.body.location} is not supported, Please check supported cities`;
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }

    req.body = filteredAccommodation(req.body);
    return next();
  }

  static async accommodationQueryParamsValidate(req, res, next) {
    const { error } = queryParamsValidateSchema.validate(req.query);
    if (error) {
      const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
      errorLogger(req, 400, Error);
      util.setError(400, Error);
      return util.send(res);
    }
    next();
  }

  static async accomPaginationByUserId(req, res, next) {
    const accommodations = await accommodationService.findByProp({
      user_id: req.userData.id,
    });
    const accommodationsReversed = accommodations.reverse();
    const data = pagination(req, res, accommodationsReversed);
    req.accommodationsData = data;
    next();
  }

  static async accomPaginationByCity(req, res, next) {
    const { accommodations } = req;
    const accommodationsReversed = accommodations.reverse();
    const data = pagination(req, res, accommodationsReversed);
    req.accommodationsData = data;
    next();
  }

  static async allAccomPagination(req, res, next) {
    const accommodations = await accommodationService.findAll();
    const accommodationsReversed = accommodations.reverse();
    const data = pagination(req, res, accommodationsReversed);
    req.accommodations = data;
    next();
  }

  static async validateIdFromParams(req, res, next) {
    const { id } = req.params;
    const { error } = idValidateSchema.validate({ id });
    if (error) {
      const messege = `The ID of a record must be an integer`;
      util.setError(400, messege);
      errorLogger(req, 400, messege);
      return util.send(res);
    }
    next();
  }
}
