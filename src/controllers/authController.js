import connection from "../database/database.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.js";
// import dotenv from "dotenv";
// dotenv.config();
import UserRepository from "../repositories/userRepository.js";
const userRepository = new UserRepository();

export async function userCreate(_, res) {
  const { name, email, password } = res.locals;
  try {
    // await connection.query(
    //   `INSERT INTO users ("name", email, "hashPwd")
    //      VALUES ($1, $2, $3);`,
    //   [name, email, password]
    // );
    await userRepository.insertUser(name, email, password);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function login(_, res) {
  const { userId } = res.locals;
  // const secretKey = process.env.JWT_SECRET;
  const secretKey = JWT_SECRET;
  const validity = { expiresIn: 60 * 30 };
  const token = jwt.sign({ userId }, secretKey, validity);
  try {
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err);
  }
}
