import models from '../models';

const { bookings } = models;

/**
 * @exports
 * @class bookingService
 */

class BookingService {
  /**
   * create new booking
   * @static createbooking
   * @param {object} newbooking
   * @memberof bookingservice
   * @returns {object} data
   */

  static createBooking(newBooking) {
    return bookings.create(newBooking);
  }

  static findByProp(prop) {
    return bookings.findAll({
      where: prop,
    });
  }
}

export default BookingService;
