/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./infrastructure/express/routes";

const app = express();

const whitelist = [
  "https://events.gilbertosilva.dev",
  "https://events-platform-79431.web.app",
  "https://events-platform-79431.firebaseapp.com",
  "https://dashboard.stripe.com",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    // console.log("CORS origin: ", origin);
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
routes(app);

export default app;
