import * as express from "express";
import * as coursesController from "../controllers/courses";

export const coursesRouter = express.Router();

coursesRouter.get("/", coursesController.readCourses)
coursesRouter.get("/:id", coursesController.readCourse)
coursesRouter.put("/:id", coursesController.updateCourse)
