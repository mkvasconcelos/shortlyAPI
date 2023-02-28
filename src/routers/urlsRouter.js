import { Router } from "express";
import {
  urlIdDelete,
  urlIdRead,
  urlsCreate,
} from "../controllers/urlsController.js";
import { urlsValidation } from "../middleware/schemaMiddleware.js";
import { tokenValidation } from "../middleware/tokenMiddleware.js";
import { urlIdValidation } from "../middleware/urlsMiddleware.js";

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", tokenValidation, urlsValidation, urlsCreate);
urlsRouter.get("/urls/:id", urlIdValidation, urlIdRead);
urlsRouter.get("/urls/open/:shortUrl");
urlsRouter.delete("/urls/:id", tokenValidation, urlIdValidation, urlIdDelete);
urlsRouter.get("/users/me");

export default urlsRouter;
