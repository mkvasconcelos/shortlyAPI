import connection from "../database/database.js";

export default class UrlsRepository {
  async insertUrl(url, shortUrl, userId) {
    try {
      let query = ` INSERT INTO urls (url, "shortUrl", "userId") 
                    VALUES ($1, $2, $3);`;
      await connection.query(query, [url, shortUrl, userId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async deleteUrl(urlId) {
    try {
      let query = ` DELETE FROM urls WHERE id =$1;`;
      await connection.query(query, [urlId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async updateAccessesUrl(urlId, accesses) {
    try {
      let query = `UPDATE urls SET accesses = $1 WHERE id = $2;`;
      await connection.query(query, [accesses + 1, urlId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async getUrlById(urlId) {
    try {
      let query = `SELECT id, "shortUrl", url, "userId" FROM urls WHERE id = $1;`;
      const result = await connection.query(query, [urlId]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getUrlByShortUrl(shortUrl) {
    try {
      let query = `SELECT * FROM urls WHERE "shortUrl" = $1;`;
      const result = await connection.query(query, [shortUrl]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getUrl(url, shortUrl, userId) {
    try {
      let query = `SELECT id, "shortUrl" FROM urls WHERE url = $1 AND "shortUrl" = $2 AND "userId" = $3;`;
      const result = await connection.query(query, [url, shortUrl, userId]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
}
