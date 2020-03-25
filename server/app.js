import express from 'express';
import swaggerRouter from './swagger/index';

const app = express();

app.use('/api-docs', swaggerRouter);

export default app;
