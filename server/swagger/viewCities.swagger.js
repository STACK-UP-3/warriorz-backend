/**
 * @swagger
 * /api/v1/trips/cities:
 *   get:
 *     tags:
 *       - Trips
 *     name: swagger
 *     summary: This is used for viewing all cities supported by barefoot nomad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 * 
 *     responses:
 *       '200':
 *             description: Cities successfully retrieved
 *       '401':
 *             description: Unauthorised Access.
 *       '404':
 *             description:  No token provided or Token expired
 * 
 * */
