import { Router } from "express";
import { rankingRead } from "../controllers/rankingController.js";

const rankingRouter = Router();
rankingRouter.get("/ranking", rankingRead);

export default rankingRouter;
