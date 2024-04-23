import type express from "express";
import { type Request, type Response } from "express";
import categoryRouter from "./categoryRoutes";
import userRouter from "./userRoutes";
import eventRouter from "./eventRoutes";
import categoryRouterAdmin from "./categoryRoutesAdmin";
import userRouterPrivate from "./userRoutesPrivate";
import eventRouterAdmin from "./eventRoutesAdmin";
import cloudinaryRouterPrivate from "./cloudinaryRoutesPrivate";
import userRouterAdmin from "./userRoutesAdmin";
import orderRouterPrivate from "./orderRoutesPrivate";
import stripeRouter from "./stripeRouter";

const routes = (app: express.Router): void => {
  app.get("/api/v1", function (_req: Request, res: Response) {
    return res.status(200).send({ message: "Api Okay!" });
  });
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/event", eventRouter);
  app.use("/api/v1/stripe", stripeRouter);

  // private routes
  app.use("/api/v1/user", userRouterPrivate);
  app.use("/api/v1/order", orderRouterPrivate);

  // admin routes
  app.use("/api/v1/user", userRouterAdmin);
  app.use("/api/v1/category", categoryRouterAdmin);
  app.use("/api/v1/event", eventRouterAdmin);
  app.use("/api/v1/cloudinary", cloudinaryRouterPrivate);

  app.use((_req: Request, res: Response) => {
    return res.status(404).send({
      statusCode: 404,
      body: "Path not found",
    });
  });
};

export default routes;
