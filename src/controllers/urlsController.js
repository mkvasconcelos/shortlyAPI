import connection from "../database/database.js";
import { nanoid } from "nanoid";

export async function urlsCreate(_, res) {
  const { userId, url } = res.locals;
  const shortUrl = nanoid();
  try {
    await connection.query(
      `INSERT INTO urls (url, "shortUrl", "userId") 
         VALUES ($1, $2, $3);`,
      [url, shortUrl, userId]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlIdRead(_, res) {
  const { array } = res.locals;
  try {
    delete array.userId;
    delete array.createdAt;
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
    let query = `DELETE FROM urls WHERE id = ${urlId};`;
    await connection.query(query);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlOpen(_, res) {
  const { urlId, url, accesses } = res.locals;
  try {
    let query = `UPDATE urls SET accesses = $1 WHERE id = ${urlId};`;
    await connection.query(query, [accesses]);
    return res.status(200).redirect(url);
  } catch (err) {
    return res.status(500).send(err);
  }
}
