import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import swaggerRouter from './swagger/index';
import router from './routes/index';

const app = express();

/**
 * API MIDDLEWARE
 * -------------------------------------------------------------------
 */
app.use('/api-docs', swaggerRouter);
app.use(morgan('dev'));

// app.use(cors());

// Handle HTTP POST requests with 'req.body' in Express framework
// ~https://stackoverflow.com/a/43626891/2661028
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * COMMON API ROUTES & END-POINTS
 * -------------------------------------------------------------------
 */
app.use('/', router);

export default app;
