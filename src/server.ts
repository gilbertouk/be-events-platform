/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import cors from "cors";
import routes from "./infrastructure/express/routes";

const app = express();

const whitelist = [
  "https://events.gilbertosilva.dev",
  "https://events-platform-79431.web.app/",
  "https://events-platform-79431.firebaseapp.com/",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

// const corsOptions: CorsOptions = {
//   origin: (origin: string | undefined, callback: any) => {
//     if (origin && (whitelist.includes(origin) || !origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
routes(app);

export default app;
