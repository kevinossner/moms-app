import * as express from "express";
import * as momsController from "../controllers/moms";

export const momsRouter = express.Router();

momsRouter.get("/", momsController.readMoms)
momsRouter.get("/:id", momsController.readMom)
momsRouter.post("/", momsController.createMom)
momsRouter.put("/:id", momsController.updateMom)
momsRouter.delete("/:id", momsController.deleteMom)