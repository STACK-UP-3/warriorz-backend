/**
 * @swagger
 * /api/v1/trips:
 *   post:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for creating a one way trip 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
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
 *         required:
 *           - origin
 *           - destination
 *           - date
 *           - travelReason
 *           - accommodationID
 *     responses:
 *       '200':
 *             description: Trip successfully registered
 *       '400':
 *             description: Invalid Input.
 *       '401':
 *             description: Unauthorised Access.
 *       '404':
 *             description:  No token provided or Token expired or
 *                           City is not supported by Barefoot Nomad
 * /api/v1/trips/multiple:
 *   post:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for requesting a trip with multiple destinations 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             origin:
 *               type: string
 *             destinations:
 *               type: string
 *             date:
 *               type: string
 *             returnDate:
 *               type: string
 *             travelReason:
 *               type: string
 *             accommodationID:
 *               type: integer
 *         required:
 *           - origin
 *           - destinations
 *           - date
 *           - travelReason
 *           - accommodationID
 *     responses:
 *       '200':
 *             description: Trip successfully registered
 *       '400':
 *             description: Invalid Input.
 *       '401':
 *             description: Unauthorised Access.
 *       '404':
 *             description:  No token provided or Token expired or
 *                           City is not supported by Barefoot Nomad
 * */
