import { Router } from "express";
import { login, userCreate } from "../controllers/authController.js";
import {
  loginValidation,
  userValidation,
} from "../middleware/authMiddleware.js";
import {
  signInValidation,
  signUpValidation,
} from "../middleware/schemaMiddleware.js";

const authRouter = Router();
authRouter.post("/signup", signUpValidation, userValidation, userCreate);
authRouter.post("/signin", signInValidation, loginValidation, login);

export default authRouter;
