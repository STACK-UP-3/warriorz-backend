import Util from '../helpers/util';

const util = new Util();

export default (req, res) =>{
  const Error = 'Page not Found';
  util.setError(404, Error);
  return util.send(res);
};