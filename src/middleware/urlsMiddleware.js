import UrlsRepository from "../repositories/urlsRepository.js";
const urlsRepository = new UrlsRepository();

export async function urlIdValidation(req, res, next) {
  const { id } = req.params;
  try {
    const array = await urlsRepository.getUrlById(id);
    if (!array) {
      return res.sendStatus(404);
    }
    res.locals.urlId = id;
    res.locals.userOwner = array.userId;
    res.locals.array = array;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function shortUrlValidation(req, res, next) {
  const { shortUrl } = req.params;
  try {
    const array = await urlsRepository.getUrlByShortUrl(shortUrl);
    if (!array) {
      return res.sendStatus(404);
    }
    res.locals.urlId = array.id;
    res.locals.url = array.url;
    res.locals.accesses = array.accesses;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
