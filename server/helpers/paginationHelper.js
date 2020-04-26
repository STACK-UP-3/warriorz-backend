import Util from './util';
import { errorLogger } from './loggerHandle';

const util = new Util();

export default (req, res, model) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (startIndex > 0) {
    results.previousPage = {
      page: page - 1,
      limit,
    };
  }

  const Pages = model.length / limit;

  if (
    Math.round(Pages) === parseInt(Pages, 10) &&
    parseInt(Pages, 10) !== Pages
  ) {
    results.pageInformation = `You are on Page ${page} of ${
      Math.round(Pages) + 1
    } Pages`;
  } else {
    results.pageInformation = `You are on Page ${page} of ${Math.round(
      Pages,
    )} Pages`;
  }

  if (startIndex >= model.length || startIndex < 0) {
    const Error = 'There is no content on this page.';
    errorLogger(req, 400, Error);
    util.setError(400, Error);
    return util.send(res);
  }

  if (endIndex < model.length) {
    results.nextPage = {
      page: page + 1,
      limit,
    };
  }

  results.result = model.slice(startIndex, endIndex);
  return results;
};
