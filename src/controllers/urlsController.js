import connection from "../database/database.js";
import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urlsRepository.js";
const urlsRepository = new UrlsRepository();

export async function urlsCreate(_, res) {
  const { userId, url } = res.locals;
  const shortUrl = nanoid();
  try {
    // await connection.query(
    //   `INSERT INTO urls (url, "shortUrl", "userId")
    //      VALUES ($1, $2, $3);`,
    //   [url, shortUrl, userId]
    // );
    await urlsRepository.insertUrl(url, shortUrl, userId);
    // const result = await connection.query(
    //   `SELECT id, "shortUrl" FROM urls WHERE url = $1 AND "shortUrl" = $2 AND "userId" = $3;`,
    //   [url, shortUrl, userId]
    // );
    const response = await urlsRepository.getUrl(url, shortUrl, userId);
    // return res.status(201).send(result.rows[0]);
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlIdRead(_, res) {
  const { array } = res.locals;
  try {
    delete array.userId;
    // delete array.createdAt;
    return res.status(200).send(array);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlIdDelete(_, res) {
  const { userId, userOwner, urlId } = res.locals;
  try {
    if (userId !== userOwner) {
      return res.sendStatus(401);
    }
    // let query = `DELETE FROM urls WHERE id = ${urlId};`;
    // await connection.query(query);
    await urlsRepository.deleteUrl(urlId);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlOpen(_, res) {
  const { urlId, url, accesses } = res.locals;
  try {
    // let query = `UPDATE urls SET accesses = $1 WHERE id = ${urlId};`;
    // await connection.query(query, [accesses + 1]);
    await urlsRepository.updateAccessesUrl(urlId, accesses);
    return res.status(200).redirect(url);
  } catch (err) {
    return res.status(500).send(err);
  }
}
