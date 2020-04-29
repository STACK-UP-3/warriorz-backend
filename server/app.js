import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport'
import cookieSession from 'cookie-session';
import dotenv from 'dotenv'
import swaggerRouter from './swagger/index';
import router from './routes/index';
import { io } from './helpers/socketConnection';

dotenv.config()

const app = express();

/**
 * API MIDDLEWARE
 * -------------------------------------------------------------------
 */
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
}))

app.use(passport.initialize())
app.use(passport.session())

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
app.use((req,res,next)=>{
    req.io = io;
    next();
  });
  
app.use('/', router);

export default app;
