import express from "express";
import cors from "cors";
import routes from "./infrastructure/express/routes";

const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5174",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://localhost:3500",
  "http://localhost:3000",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
routes(app);

export default app;
