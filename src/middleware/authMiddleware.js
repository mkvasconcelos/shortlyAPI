import bcrypt from "bcrypt";
import UserRepository from "../repositories/userRepository.js";
const userRepository = new UserRepository();

export async function userValidation(_, res, next) {
  const { email } = res.locals;
  try {
    const response = await userRepository.getUserByEmail(email);
    if (response) {
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
    const response = await userRepository.getUserByEmail(email);
    if (!response || !bcrypt.compareSync(password, response.hashPwd)) {
      return res.sendStatus(401);
    }
    res.locals.userId = response.id;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
