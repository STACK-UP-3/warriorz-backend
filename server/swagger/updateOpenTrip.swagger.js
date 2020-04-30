/**
 * @swagger
 * /api/v1/trips/{trip_id}:
 *   patch:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for updating trip details an open trip 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *       - name: trip_id
 *         in: path
 *         schema:
 *              type: integer
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             origin:
 *               type: string
 *             destination:
 *               type: string
 *             date:
 *               type: string
 *             returnDate:
 *               type: string
 *             travelReason:
 *               type: string
 *             accommodationID:
 *               type: integer
 *     responses:
 *       '200':
 *             description: Trip successfully updated
 *       '400':
 *             description: Bad Request.
 *       '401':
 *             description: Unauthorised Access.
 *       '403':
 *             description: Forbidden Gate.
 *       '404':
 *             description:  Request Not found / Token not found / Token expired
 * */
