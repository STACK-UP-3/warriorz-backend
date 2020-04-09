/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     tags:
 *       - Authorization
 *     name: Roles
 *     summary: The API endpoint for creating a new Role
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
 *             permissions:
 *               type: string
 *         required:
 *           - name
 *     responses:
 *       '200':
 *             description: Role created successfully
 *       '403':
 *             description: Forbidden route.
 *       '409':
 *             description: Role with name {name} already exists.
 * */
