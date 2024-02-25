import * as express from "express";
import { db } from "../index";
import { BaseAppointment, Appointment } from "../types/appointments";

export const readAppointments = async (req: express.Request, res: express.Response) => {
  try {
    const entries = await db.collection("appointments").orderBy("date").get();

    if (entries.empty) {
      const resBody = {
        status: "error",
        message: "No appointment found",
        data: [],
      };
      return res.status(404).json(resBody);
    }

    const appointments: Appointment[] = [];
    for (const entry of entries.docs) {
      const appointment: Appointment = {
        id: entry.id,
        courseId: entry.data().courseId,
        date: entry.data().date,
        momsAttended: entry.data().momsAttended
      };
      appointments.push(appointment);
    }
    const resBody = {
      status: "success",
      message: "Appointments found",
      data: appointments,
    };
    return res.status(200).json(resBody);
  } catch (error) {
    const responseBody = {
      status: "error",
      message: error,
      data: undefined
    };
    return res.status(500).json(responseBody);
  }
};

export const readAppointmentsByDate = async (req: express.Request, res: express.Response) => {
    try {
      const date = req.params.date;
      const entries = await db.collection("appointments").where("date", "==", date).get();
  
      if (entries.empty) {
        const resBody = {
          status: "error",
          message: "No course found",
          data: [],
        };
        return res.status(404).json(resBody);
      }
  
      const appointments: Appointment[] = [];
      for (const entry of entries.docs) {
        const appointment: Appointment = {
          id: entry.id,
          courseId: entry.data().courseId,
          date: entry.data().date,
          momsAttended: entry.data().momsAttended
        };
        appointments.push(appointment);
      }
      const resBody = {
        status: "success",
        message: "Appointments found",
        data: appointments,
      };
      return res.status(200).json(resBody);
    } catch (error) {
      const responseBody = {
        status: "error",
        message: error,
        data: undefined
      };
      return res.status(500).json(responseBody);
    }
  };

  export const createAppointment = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const createAppointment: BaseAppointment = {
        courseId: req.body.courseId,
        date: req.body.date,
        momsAttended: req.body.momsAttended
      };
      const docRef = await db.collection("appointments").add(createAppointment);
      const appointment: Appointment = { id: docRef.id, ...createAppointment };
      const resBody = {
        status: "success",
        message: "Appointment created",
        data: appointment,
      };
      return res.status(201).json(resBody);
    } catch (error) {
      const responseBody = {
        status: "error",
        message: error,
        data: undefined
      };
      return res.status(500).json(responseBody);
    }
  };

export const updateAppointment = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const appointmentId = req.params.id;
      const updateAppointment: BaseAppointment = {
        courseId: req.body.id,
        date: req.body.date,
        momsAttended: req.body.momsAttended
      };
  
      await db.collection("appointments").doc(appointmentId).set(updateAppointment, { merge: true });
      const appointment: Appointment = { id: appointmentId, ...updateAppointment };
      const resBody = {
        status: "success",
        message: "Appointment updated",
        data: appointment,
      };
      return res.status(200).json(resBody);
    } catch (error) {
      const responseBody = {
        status: "error",
        message: error,
        data: undefined
      };
      return res.status(500).json(responseBody);
    }
  };