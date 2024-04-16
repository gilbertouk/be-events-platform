import type express from "express";
import { type Request, type Response } from "express";
import categoryRouter from "./categoryRoutes";

const routes = (app: express.Router): void => {
  app.get("/api/v1", function (_req: Request, res: Response) {
    return res.status(200).send({ message: "Api Okay!" });
  });
  app.use("/api/v1", categoryRouter);
  // app.use("/api", courseMealRouter);
  // app.use("/api", cuisinesRouter);

  // // protected routers
  // app.use("/api", usersRouter);
  // app.use("/api", orderRouter);
  // app.use("/api", adminRouter);

  app.use((_req: Request, res: Response) => {
    return res.status(404).send({
      statusCode: 404,
      body: "Path not found",
    });
  });
};

export default routes;
