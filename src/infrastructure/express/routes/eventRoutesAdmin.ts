import express from "express";
import { EventController } from "../../../presentation/controllers/EventController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const eventRouterAdmin = express.Router();

eventRouterAdmin.use(
  AuthMiddleware.verifyAccessToken,
  AuthMiddleware.verifyAdminAccess,
);

eventRouterAdmin
  .post("/", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.crateEvent(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.deleteEvent(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default eventRouterAdmin;
