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
