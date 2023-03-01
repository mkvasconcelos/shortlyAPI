import { Router } from "express";
import { userRead } from "../controllers/userController.js";
import { tokenValidation } from "../middleware/tokenMiddleware.js";

const userRouter = Router();
userRouter.get("/users/me", tokenValidation, userRead);

export default userRouter;
