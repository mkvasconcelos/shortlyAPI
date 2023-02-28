import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";

export async function signUpValidation(req, res, next) {
  const body = req.body;
  const { error } = signUpSchema.validate(body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  const hashPassword = bcrypt.hashSync(body.password, 10);
  res.locals.name = body.name;
  res.locals.email = body.email;
  res.locals.password = hashPassword;
  next();
}

export async function signInValidation(req, res, next) {
  const body = req.body;
  const { error } = signInSchema.validate(body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  res.locals.email = body.email;
  res.locals.password = body.password;
  next();
}
