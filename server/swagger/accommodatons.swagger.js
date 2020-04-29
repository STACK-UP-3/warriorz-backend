/**
 * @swagger
 * /api/v1/accommodations:
 *   post:
 *     tags:
 *       - Accommodation
 *     name: swagger
 *     summary: This is used as the endpoint for creating a new accommodation record in Barefoot Nomad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             location:
 *               type: string
 *             description:
 *               type: string
 *             owner:
 *               type: string
 *             status:
 *               type: string
 *             type:
 *               type: string
 *             services:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      description:
 *                          type: string
 *                      cost:
 *                          type: string
 *             rooms:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      type:
 *                          type: string
 *                      status:
 *                          type: string
 *                      cost:
 *                          type: string
 *                      smilarRooms:
 *                          type: integer
 *                      roomNumber:
 *                          type: integer
 *                      image:
 *                          type: object
 *                          properties:
 *                              url:
 *                                  type: string
 *                              details:
 *                                  type: string
 *             images:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      url:
 *                          type: string
 *                      detals:
 *                          type: string
 *           required:
 *             - name
 *             - location
 *             - owner
 *             - status
 *             - services
 *             - images
 *             - rooms
 *         required: true
 *     responses:
 *       '201':
 *             description: User successfuly updated with data object in response
 *       '400':
 *             description: Invalid Input.
 *       '403':
 *              description: Unauthorized access.
 * */

/**
 * @swagger
 * /api/v1/accommodations?page={page}&limit={limit}:
 *   get:
 *     tags:
 *       - Accommodation
 *     name: swagger
 *     summary: This is used as the endpoint for getting all accommodation facilities in Barefoot Nomad [Only for Travel Administrator and SUpplier]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: headers
 *         schema:
 *           type: string
 *         required:
 *           - authorization
 *     responses:
 *       '200':
 *             description: Accommodatios retrieved
 *       '401':
 *              description: No token provide.
 *       '403':
 *              description: Unauthorized access.
 * */

/**
 * @swagger
 * /api/v1/accommodations?page={page}&limit={limit}&city={cityname}:
 *   get:
 *     tags:
 *       - Accommodation
 *     name: swagger
 *     summary: This is used as the endpoint for getting all accommodation facilities in Barefoot Nomad [Only for Requester]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: headers
 *         schema:
 *           type: string
 *         required:
 *           - authorization
 *     responses:
 *       '200':
 *             description: Accommodatios retrieved
 *       '401':
 *              description: No token provide.
 *       '403':
 *              description: Unauthorized access.
 * */
