/**
 * @swagger
 * /api/v1/trips/{trip_id}:
 *   get:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for viewing a specific trip of a user.
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
 * 
 *     responses:
 *       '200':
 *             description: Trip successfully retrieved.
 *       '400':
 *             description: Bad Request.
 *       '401':
 *             description: Unauthorised Access.
 *       '403':
 *             description: Forbidden Gate.
 *       '404':
 *             description:  No token provided or Token expired/ Not Found 
 * 
 * */
