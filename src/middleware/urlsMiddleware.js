import connection from "../database/database.js";

export async function urlIdValidation(req, res, next) {
  const { id } = req.params;
  try {
    let query = `SELECT * FROM urls WHERE id = ${id};`;
    const result = await connection.query(query);
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.array = result.rows[0];
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
