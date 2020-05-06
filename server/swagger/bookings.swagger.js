/**
 * @swagger
 * /api/v1/accommodations/bookings:
 *   post:
 *     tags:
 *       - Accommodation
 *     name: swagger
 *     summary: This is used as the endpoint for creating a new accommodation booking record in Barefoot Nomad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             accommodationId:
 *               type: integer
 *             roomId:
 *               type: integer
 *             tripId:
 *               type: integer
 *             checkInDate:
 *               type: date
 *             checkOutDate:
 *               type: date
 *           required:
 *             - accommodationId
 *             - roomId
 *             - tripId
 *             - checkInDate
 *             - checkOutDate
 *         required: true
 *     responses:
 *       '201':
 *             description: Accommodation booked susccessfuly
 *       '400':
 *             description: Invalid Input.
 *       '403':
 *              description: Unauthorized access.
 * */
