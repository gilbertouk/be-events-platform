import express from "express";
import { EventController } from "../../../presentation/controllers/EventController";

const eventRouter = express.Router();

eventRouter
  .post("/event", async (req, res, next) => {
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
  .delete("/event/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.deleteEvent(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/events", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.fetchEvents(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default eventRouter;
