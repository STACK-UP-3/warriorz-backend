import models from "../models";

const { triprequests, users, trips } = models;

/**
 * @exports
 * @class TripsRequestService
 */

class TripsRequestService {
  /**
   * create new trip
   * @static createtrip
   * @param {object} newtrip
   * @memberof TripsrequestService
   * @returns {object} data
   */

  static createTripReq(newTrip) {
    return triprequests.create(newTrip);
  }

  static findByProp(prop) {
    return triprequests.findAll({
      where: prop,
      include: ["tripRequest"],
    });
  }

  static findOneEntry(prop) {
    return triprequests.findOne({
      where: prop,
      include: ["tripRequest"],
    });
  }

  static findApproval() {
    return triprequests.findAll({
      attributes: [
        'id',
        'status',
        'user_id',
      ],
      where: { status: "pending" },
      include: [
        {
          as: "user",
          model: users,
          attributes: ["firstname", "lastname", "email"],

        },
        {
         as:"tripRequest",
         model:trips,
         attributes: ["origin", "destination", "dateOfTravel","travelReason","dateOfTravel","createdAt"],
        },
      ],
     },
    );
  }
}

export default TripsRequestService;
