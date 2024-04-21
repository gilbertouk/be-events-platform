import type express from "express";
import { type Request, type Response } from "express";
import categoryRouter from "./categoryRoutes";
import userRouter from "./userRoutes";
import eventRouter from "./eventRoutes";
import categoryRouterPrivate from "./categoryRoutesPrivate";
import userRouterPrivate from "./userRoutesPrivate";
import eventRouterPrivate from "./eventRoutesPrivate";
import cloudinaryRouterPrivate from "./cloudinaryRoutesPrivate";

const routes = (app: express.Router): void => {
  app.get("/api/v1", function (_req: Request, res: Response) {
    return res.status(200).send({ message: "Api Okay!" });
  });
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/event", eventRouter);

  // private routes
  app.use("/api/v1/user", userRouterPrivate);
  app.use("/api/v1/category", categoryRouterPrivate);
  app.use("/api/v1/event", eventRouterPrivate);
  app.use("/api/v1/cloudinary", cloudinaryRouterPrivate);

  app.use((_req: Request, res: Response) => {
    return res.status(404).send({
      statusCode: 404,
      body: "Path not found",
    });
  });
};

export default routes;
