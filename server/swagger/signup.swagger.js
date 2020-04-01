/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - auth
 *     name: swagger
 *     summary: This is used for signup endpoint   
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
 *             password:
 *               type: string
 *               format: password
 *             bio:
 *               type: string
 *         required:
 *           - firstname
 *           - lastname
 *           - email
 *           - password
 *     responses:
 *       '201':
 *             description: User successfuly created
 *       '400':
 *             description: Invalid Input.
 *       '409':
 *              description: Email already exists.
 * */
