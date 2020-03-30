import express from 'express';
import dotenv from 'dotenv';
import api from './api/apiRoutes';
import notFound from '../middlewares/notFound';
import Util from '../helpers/util';

const util = new Util();

dotenv.config();
const router = express.Router(); 

const version = process.env.API_VERSION;
const url = `/api/${version}`;

router.get('/', (req, res)=>{
    const message = 'Welcome to warriors barefoot Nomad app.';
    util.setSuccess(200, message);
    return util.send(res);
});

router.use(`${url}`, api);
router.use(notFound);

export default router;
