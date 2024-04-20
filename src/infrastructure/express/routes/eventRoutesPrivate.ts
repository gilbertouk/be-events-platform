import express from "express";
// import { EventController } from "../../../presentation/controllers/EventController";

const eventRouterPrivate = express.Router();

// eventRouterPrivate
//   .post("/event", async (req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.crateEvent(req);
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })
//   .delete("/event/:id", async (req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.deleteEvent(req);
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })
//   .get("/events", async (req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.fetchEvents(req);
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })
//   .get("/events/trending", async (_req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.fetchTrending();
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })
//   .get("/events/cities", async (_req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.fetchEventsCities();
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })
//   .get("/event/:id", async (req, res, next) => {
//     try {
//       const { statusCode, body } = await EventController.fetchEventById(req);
//       return res.status(statusCode).send({
//         statusCode,
//         body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

export default eventRouterPrivate;