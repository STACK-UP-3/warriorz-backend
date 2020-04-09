/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     name: User Sign-In
 *     summary: The API endpoint for a user to sign in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *             description: User authenticated successfully
 *       '400':
 *             description: Invalid input (email or password).
 *       '404':
 *             description: User does not exist.
 * */
