import Util from './util';

const util = new Util();

export default (pageString, limitString, model, res) => {
  const page = parseInt(pageString, 10);
  const limit = parseInt(limitString, 10);

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
    results.numberOfPages = Math.round(Pages) + 1;
    results.pageInformation = `You are on Page ${page} of ${
      Math.round(Pages) + 1
    } Pages`;
  } else {
    results.numberOfPages = Math.round(Pages);
    results.pageInformation = `You are on Page ${page} of ${Math.round(
      Pages,
    )} Pages`;
  }

  if (startIndex >= model.length || startIndex < 0) {
    const Error = 'There is no content on this page.';
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
