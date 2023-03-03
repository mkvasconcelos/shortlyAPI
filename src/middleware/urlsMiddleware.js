import connection from "../database/database.js";
import UrlsRepository from "../repositories/urlsRepository.js";
const urlsRepository = new UrlsRepository();

export async function urlIdValidation(req, res, next) {
  const { id } = req.params;
  try {
    // let query = `SELECT * FROM urls WHERE id = ${id};`;
    // const result = await connection.query(query);
    // if (result.rows.length === 0) {
    const array = await urlsRepository.getUrlById(id);
    if (!array) {
      return res.sendStatus(404);
    }
    res.locals.urlId = id;
    // res.locals.userOwner = result.rows[0].userId;
    // res.locals.array = result.rows[0];
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
    // let query = `SELECT * FROM urls WHERE "shortUrl" = '${shortUrl}';`;
    // const result = await connection.query(query);
    // if (result.rows.length === 0) {
    const array = await urlsRepository.getUrlByShortUrl(shortUrl);
    if (!array) {
      return res.sendStatus(404);
    }
    // res.locals.urlId = result.rows[0].id;
    // res.locals.url = result.rows[0].url;
    // res.locals.accesses = result.rows[0].accesses;
    res.locals.urlId = array.id;
    res.locals.url = array.url;
    res.locals.accesses = array.accesses;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
