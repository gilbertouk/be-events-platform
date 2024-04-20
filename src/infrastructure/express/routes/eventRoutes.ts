import express from "express";
import { EventController } from "../../../presentation/controllers/EventController";

const eventRouter = express.Router();

eventRouter
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
  })
  .get("/all", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.fetchEvents(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/all/trending", async (_req, res, next) => {
    try {
      const { statusCode, body } = await EventController.fetchTrending();
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/all/cities", async (_req, res, next) => {
    try {
      const { statusCode, body } = await EventController.fetchEventsCities();
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await EventController.fetchEventById(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default eventRouter;
