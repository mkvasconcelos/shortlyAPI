import connection from "../database/database.js";

export default class UserRepository {
  async insertUser(name, email, password) {
    try {
      let query = ` INSERT INTO users ("name", email, "hashPwd") 
                    VALUES ($1, $2, $3);`;
      await connection.query(query, [name, email, password]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async getUserWithUrls(userId) {
    try {
      let queryUser = ` SELECT users.id, users.name, SUM(urls.accesses) AS "visitCount"
                        FROM users 
                        LEFT JOIN urls ON urls."userId" = users."id" 
                        WHERE users.id = $1
                        GROUP BY users.id;`;
      const resultUser = await connection.query(queryUser, [userId]);
      let queryUrls = ` SELECT id, "shortUrl", url, accesses AS "visitCount"
                        FROM urls 
                        WHERE "userId" = $1;`;
      const resultUrls = await connection.query(queryUrls, [userId]);
      const response = {
        ...resultUser.rows[0],
        shortenedUrls: resultUrls.rows,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      let query = `SELECT * FROM users WHERE email = $1;`;
      const result = await connection.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
}
