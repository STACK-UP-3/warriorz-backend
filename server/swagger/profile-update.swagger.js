/**
 * @swagger
 * /api/v1/profile:
 *   patch:
 *     tags:
 *       - User Management
 *     name: swagger
 *     summary: This is used as the endpoint for updating user profile informaton. The properties in the body are not required at once, you can pass in only what you wnat to update
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             bio:
 *               type: string
 *             country:
 *               type: string
 *             gender:
 *               type: string
 *             birthdate:
 *               type: string
 *             preferedLanguage:
 *               type: string
 *             preferedCurrency:
 *               type: string
 *             city:
 *               type: string
 *             department:
 *               type: string
 *             appNotificaton:
 *               type: boolean
 *             emailNotification:
 *               type: boolean
 *             photoUrl:
 *               type: string
 *               format: url
 *         required:
 *           - body
 *     responses:
 *       '200':
 *             description: User successfuly updated
 *       '400':
 *             description: Invalid Input.
 *       '403':
 *              description: Unauthorized access.
 * */

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     tags:
 *       - User Management
 *     name: swagger
 *     summary: This is used as the endpoint for getting user profile. User must be authenticated with token
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
 *             description: User profile
 *       '404':
 *             description: User not found.
 *       '403':
 *              description: Unauthorized access.
 * */
