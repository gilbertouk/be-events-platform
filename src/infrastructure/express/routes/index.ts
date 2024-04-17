import type express from "express";
import { type Request, type Response } from "express";
import categoryRouter from "./categoryRoutes";
import userRouter from "./userRoutes";
import eventRouter from "./EventRoutes";

const routes = (app: express.Router): void => {
  app.get("/api/v1", function (_req: Request, res: Response) {
    return res.status(200).send({ message: "Api Okay!" });
  });
  app.use("/api/v1", categoryRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", eventRouter);

  app.use((_req: Request, res: Response) => {
    return res.status(404).send({
      statusCode: 404,
      body: "Path not found",
    });
  });
};

export default routes;
