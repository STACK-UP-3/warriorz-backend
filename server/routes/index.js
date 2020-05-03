import 'dotenv/config';
import express from 'express';
// ... Local file imports ...
import api from './api/apiRoutes';
import notFound from '../middlewares/notFound';
import Util from '../helpers/util';

const util = new Util();
const router = express.Router();
const version = process.env.API_VERSION;
const url = `/api/${version}`;

router.get('/', (req, res) => {
  util.setSuccess(200, 'Welcome to Barefoot Nomad (Warriorz) app.');
  return util.send(res);
});

router.use(`${url}`, api);
router.use(notFound);

export default router;
