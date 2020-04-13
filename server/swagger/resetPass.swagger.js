/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     tags:
 *       - Authentication
 *     name: forgot password
 *     summary: When user request forgot password, send a reset link to the user's email
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *         required:
 *           - email
 *     responses:
 *       '200':
 *             description: Reset token sent to email!.
 *       '404':
 *             description: No user found with this email.
 *       '500':
 *              description: Internal server error.
 * */
/**
 * @swagger
 * /api/v1/password/reset:
 *   patch:
 *     tags:
 *       - Authentication
 *     name: Reset password
 *     summary: Reset user password to a given new password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - password
 *     responses:
 *       '200':
 *             description: Password changed successfuly.
 *       '404':
 *             description: No user found with this email.
 *       '500':
 *              description: Internal server error.
 * */
