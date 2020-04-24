/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     name: User Sign-Out
 *     summary: The API endpoint for a user to sign out of the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *     responses:
 *       '200':
 *             description: You have logged out successfully
 *       '403':
 *             description: Token not provided
 *       '404':
 *             description: User does not exist
 * */
