import connection from "../database/database.js";
import jwt from "jsonwebtoken";

export async function userCreate(_, res) {
  const { name, email, password } = res.locals;
  try {
    await connection.query(
      `INSERT INTO users ("fullName", email, "hashPwd") 
         VALUES ($1, $2, $3);`,
      [name, email, password]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function login(_, res) {
  const { userId } = res.locals;
  const secretKey = process.env.JWT_SECRET;
  const validity = { expiresIn: 60 * 30 };
  const token = jwt.sign({ userId }, secretKey, validity);
  try {
    await connection.query(
      `INSERT INTO sessions ("userId", token) 
           VALUES ($1, $2);`,
      [userId, token]
    );
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send(err);
  }
}
