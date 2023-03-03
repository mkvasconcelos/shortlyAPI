import connection from "../database/database.js";

export async function userRead(_, res) {
  const { userId } = res.locals;
  try {
    let queryUser = ` SELECT users.id, users.name, SUM(urls.accesses) AS "visitCount"
                  FROM users 
                  LEFT JOIN urls ON urls."userId" = users."id" 
                  WHERE users.id = ${userId}
                  GROUP BY users.id;`;
    const resultUser = await connection.query(queryUser);
    let queryUrls = ` SELECT id, "shortUrl", url, accesses AS "visitCount"
                  FROM urls 
                  WHERE "userId" = ${userId};`;
    const resultUrls = await connection.query(queryUrls);
    const response = { ...resultUser.rows[0], shortenedUrls: resultUrls.rows };
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
}
