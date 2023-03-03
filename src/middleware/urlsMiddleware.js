import connection from "../database/database.js";

export async function urlIdValidation(req, res, next) {
  const { id } = req.params;
  try {
    let query = `SELECT * FROM urls WHERE id = ${id};`;
    const result = await connection.query(query);
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.urlId = id;
    res.locals.userOwner = result.rows[0].userId;
    res.locals.array = result.rows[0];
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function shortUrlValidation(req, res, next) {
  const { shortUrl } = req.params;
  try {
    let query = `SELECT * FROM urls WHERE "shortUrl" = '${shortUrl}';`;
    const result = await connection.query(query);
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.urlId = result.rows[0].id;
    res.locals.url = result.rows[0].url;
    res.locals.accesses = result.rows[0].accesses;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
