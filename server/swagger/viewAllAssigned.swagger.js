/**
 * @swagger
 * /api/v1/trips/assigned?page={page}&limit={limit}:
 *   get:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for viewing all trips assigned to the manager.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *       - name: page
 *         in: path
 *         schema:
 *              type: integer
 *       - name: limit
 *         in: path
 *         schema:
 *              type: integer
 * 
 *     responses:
 *       '200':
 *             description: Trips successfully retrieved.
 *       '400':
 *             description: Bad Request.
 *       '401':
 *             description: Unauthorised Access.
 *       '403':
 *             description: Forbidden Gate.
 *       '404':
 *             description:  No token provided or Token expired
 * 
 * */
