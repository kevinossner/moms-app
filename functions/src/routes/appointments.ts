import * as express from "express";
import * as appointmentsController from "../controllers/appointments";

export const appointmentsRouter = express.Router();

appointmentsRouter.get("/", appointmentsController.readAppointments)
appointmentsRouter.get("/:date", appointmentsController.readAppointmentsByDate)
appointmentsRouter.put("/:id", appointmentsController.updateAppointment)
appointmentsRouter.post("/", appointmentsController.createAppointment)