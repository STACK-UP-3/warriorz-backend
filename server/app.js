import express from 'express';
import morgan from 'morgan';
import swaggerRouter from './swagger/index';
import routes from './routes/index';

const app = express();

app.use('/api-docs', swaggerRouter);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

export default app;
