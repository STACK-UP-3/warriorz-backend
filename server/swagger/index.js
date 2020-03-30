import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const swaggerDefinition = {
  definition: {
    info: {
      title: 'Barefoot-Nomad-Warriorz',
      description:
        'The Barefoot is web application that.., it was build by Andela stackup-3 team: Worriorz',
      version: '1.0.0',
    },
    host: process.env.API_BASE_URL,
    security: {
      bearerAuth: {
        name: 'token',
        description:
          'To use API, you have to login and get toke to use for access',
        in: 'header',
        scheme: 'bearer',
      },
    },
  },
  apis: ['./server/swagger/*.swagger.js'],
};
const swaggerDocumentation = swaggerJSDoc(swaggerDefinition);

const swaggerRouter = Router();

swaggerRouter.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocumentation);
});

swaggerRouter.use('/', swaggerui.serve, swaggerui.setup(swaggerDocumentation));

export default swaggerRouter;
