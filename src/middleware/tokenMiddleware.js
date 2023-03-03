import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.js";
// import dotenv from "dotenv";
// dotenv.config();

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  // const secretKey = process.env.JWT_SECRET;
  const secretKey = JWT_SECRET;
  const token = authorization?.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, secretKey);
    res.locals.userId = data.userId;
    next();
  } catch {
    return res.status(401).send("Your session expired, sign-in again.");
  }
}
