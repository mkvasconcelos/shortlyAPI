import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";
const userRepository = new UserRepository();

export async function userCreate(_, res) {
  const { name, email, password } = res.locals;
  try {
    await userRepository.insertUser(name, email, password);
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
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send(err);
  }
}
