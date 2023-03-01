import express from "express";
import urlsRouter from "./urlsRouter.js";
import authRouter from "./authRouter.js";
import rankingRouter from "./rankingRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();
router.use(urlsRouter);
router.use(authRouter);
router.use(userRouter);
router.use(rankingRouter);
export default router;
