/**
 * @swagger
 * /api/v1/notifications/{notification_id}:
 *   get:
 *     tags:
 *       - Notifications
 *     name: swagger
 *     summary: This is used for viewing a specific notification of a user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *       - name: notification_id
 *         in: path
 *         schema:
 *              type: integer
 * 
 *     responses:
 *       '200':
 *             description: notification successfully retrieved.
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
