import * as express from "express";
import { db } from "../index";
import { BaseMom, Mom } from "../types/moms";

export const readMoms = async (req: express.Request, res: express.Response) => {
  try {
    const entries = await db.collection("moms").orderBy("firstName").get();

    if (entries.empty) {
      const resBody = {
        status: "error",
        message: "No mom found",
        data: [],
      };
      return res.status(404).json(resBody);
    }

    const moms: Mom[] = [];
    for (const entry of entries.docs) {
      const momData: Mom = {
        id: entry.id,
        firstName: entry.data().firstName,
        lastName: entry.data().lastName,
        billsPayed: entry.data().billsPayed,
        courses: entry.data().courses,
        appointments: entry.data().appointments,
      };
      moms.push(momData);
    }
    const resBody = {
      status: "success",
      message: "Moms found",
      data: moms,
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

export const readMom = async (req: express.Request, res: express.Response) => {
  try {
    const momId = req.params.id;
    const entry = await db.collection("moms").doc(momId).get();

    if (!entry.exists) {
      const resBody = {
        status: "error",
        message: "No mom found",
        data: [],
      };
      return res.status(404).json(resBody);
    }

    const momData: Mom = {
      id: entry.id,
      firstName: entry.data()!.firstName,
      lastName: entry.data()!.lastName,
      billsPayed: entry.data()!.billsPayed,
      courses: entry.data()!.courses,
      appointments: entry.data()!.appointments,
    };

    const resBody = {
      status: "success",
      message: "Moms found",
      data: momData,
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

export const createMom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createMom: BaseMom = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      billsPayed: req.body.billsPayed,
      courses: req.body.courses,
      appointments: req.body.appointments,
    };
    const docRef = await db.collection("moms").add(createMom);
    const mom: Mom = { id: docRef.id, ...createMom };
    const resBody = {
      status: "success",
      message: "Mom created",
      data: mom,
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

export const updateMom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const momId = req.params.id;
    const updateMom: BaseMom = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      billsPayed: req.body.billsPayed,
      courses: req.body.courses,
      appointments: req.body.appointments,
    };

    await db.collection("moms").doc(momId).set(updateMom, { merge: true });
    const mom: Mom = { id: momId, ...updateMom };
    const resBody = {
      status: "success",
      message: "Mom updated",
      data: mom,
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

export const deleteMom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const momId = req.params.id;

    await db.collection("moms").doc(momId).delete();
    const resBody = {
      status: "success",
      message: "Mom deleted",
      data: undefined
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
