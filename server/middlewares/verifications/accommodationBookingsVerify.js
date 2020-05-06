/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Util from '../../helpers/util';
import { errorLogger } from '../../helpers/loggerHandle';
import accommodationService from '../../services/accommodationService';
import roomService from '../../services/roomService';
import tripService from '../../services/tripServices';
import bookingService from '../../services/bookingService';

const util = new Util();

dotenv.config();

class VerifyAccommodationBookings {
  static async verifyBookingAvailablity(req, res, next) {
    const accommodation = await accommodationService.findByProp({
      id: req.bookingInfo.accommodationId,
    });

    if (!accommodation[0]) {
      const messege = `Accommodation ${req.bookingInfo.accommodationId} not found`;
      util.setError(404, messege);
      errorLogger(req, 404, messege);
      return util.send(res);
    }

    const room = await roomService.findByProp({
      id: req.bookingInfo.roomId,
      accommodation_id: req.bookingInfo.accommodationId,
    });

    if (!room[0]) {
      const messege = `Room ${req.bookingInfo.roomId} not found in given accommodation facility`;
      util.setError(404, messege);
      errorLogger(req, 404, messege);
      return util.send(res);
    }

    const trip = await tripService.findByProp({ id: req.bookingInfo.tripId });
    if (!trip[0]) {
      const messege = `Trip ${req.bookingInfo.tripId} not found`;
      util.setError(404, messege);
      errorLogger(req, 404, messege);
      return util.send(res);
    }

    const booking = await bookingService.findByProp({
      checkInDate: req.bookingInfo.checkInDate.toString(),
      checkOutDate: req.bookingInfo.checkOutDate.toString(),
      room_id: req.bookingInfo.roomId,
      accommodation_id: req.bookingInfo.accommodationId,
    });

    if (booking[0]) {
      const messege =
        'The room you equested is aleady booked in given dates, Please choose from other rooms';
      errorLogger(req, 400, messege);
      util.setError(400, messege);
      return util.send(res);
    }
    req.bookingInfo.user_id = req.userData.id;
    next();
  }
}

export default VerifyAccommodationBookings;
