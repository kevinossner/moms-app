import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { momsRouter } from "./routes/moms";
import { coursesRouter } from "./routes/courses";


var serviceAccount = require("../serviceAccountKey.json");


const app = express();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const allowedOrigins = ["*"];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));

app.use("/api/moms", momsRouter);
app.use("/api/courses", coursesRouter);

exports.app = functions.region("europe-west3").https.onRequest(app);

const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();
export const db = firestoreDb;