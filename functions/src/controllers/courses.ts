import * as express from "express";
import { db } from "../index";
import { BaseCourse, Course } from "../types/courses";

export const readCourses = async (req: express.Request, res: express.Response) => {
  try {
    const entries = await db.collection("courses").orderBy("name").get();

    if (entries.empty) {
      const resBody = {
        status: "error",
        message: "No course found",
        data: [],
      };
      return res.status(404).json(resBody);
    }

    const courses: Course[] = [];
    for (const entry of entries.docs) {
      const course: Course = {
        id: entry.id,
        name: entry.data().name,
        moms: entry.data().moms
      };
      courses.push(course);
    }
    const resBody = {
      status: "success",
      message: "Courses found",
      data: courses,
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

export const readCourse = async (req: express.Request, res: express.Response) => {
    try {
      const courseId = req.params.id;
      const entry = await db.collection("courses").doc(courseId).get();
  
      if (!entry.exists) {
        const resBody = {
          status: "error",
          message: "No course found",
          data: [],
        };
        return res.status(404).json(resBody);
      }
  
      const course: Course = {
        id: entry.id,
        name: entry.data()!.name,
        moms: entry.data()!.moms,
      };
  
      const resBody = {
        status: "success",
        message: "Course found",
        data: course,
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

export const updateCourse = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const courseId = req.params.id;
      const updateCourse: BaseCourse = {
        name: req.body.name,
        moms: req.body.moms
      };
  
      await db.collection("courses").doc(courseId).set(updateCourse, { merge: true });
      const course: Course = { id: courseId, ...updateCourse };
      const resBody = {
        status: "success",
        message: "Course updated",
        data: course,
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