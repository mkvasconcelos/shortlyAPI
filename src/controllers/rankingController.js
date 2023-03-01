import connection from "../database/database.js";

export async function rankingRead(_, res) {
  try {
    let query = ` SELECT users.id, users.name, COUNT(urls.id) AS "linksCount",SUM(urls.accesses) AS "visitCount"
                  FROM users 
                  INNER JOIN urls ON urls."userId" = users."id" 
                  GROUP BY users.id
                  ORDER BY "visitCount" DESC
                  LIMIT 10;`;
    const result = await connection.query(query);
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}
