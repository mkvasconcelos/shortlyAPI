import connection from "../database/database.js";
import bcrypt from "bcrypt";

export async function userValidation(_, res, next) {
  const { email } = res.locals;
  try {
    let query = `SELECT * FROM users WHERE email = '${email}';`;
    const result = await connection.query(query);
    if (result.rows.length !== 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function loginValidation(_, res, next) {
  const { email, password } = res.locals;
  try {
    let query = `SELECT * FROM users WHERE email = '${email}';`;
    const result = await connection.query(query);
    if (
      result.rows.length === 0 ||
      !bcrypt.compareSync(password, result.rows[0].hashPwd)
    ) {
      return res.sendStatus(401);
    }
    res.locals.userId = result.rows[0].id;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
