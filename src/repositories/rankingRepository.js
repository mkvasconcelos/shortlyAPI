import connection from "../database/database.js";

export default class RankingRepository {
  async getTopRankedUsers() {
    try {
      let query = ` SELECT users.id, users.name, COUNT(urls.id) AS "linksCount",SUM(urls.accesses) AS "visitCount"
                    FROM users 
                    LEFT JOIN urls ON urls."userId" = users."id" 
                    GROUP BY users.id
                    ORDER BY "visitCount" DESC
                    LIMIT 10;`;
      const result = await connection.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}
