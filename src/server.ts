import express from "express";
import cors from "cors";
import routes from "./infrastructure/express/routes";

const app = express();

const allowedOrigins = [
  "https://events.gilbertosilva.dev",
  "https://events-platform-79431.web.app/",
  "https://events-platform-79431.web.app/",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
routes(app);

export default app;
