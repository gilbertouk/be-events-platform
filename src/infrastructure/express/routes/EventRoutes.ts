import express from "express";
import { EventController } from "../../../presentation/controllers/EventController";

const eventRouter = express.Router();

eventRouter.post("/event", async (req, res, next) => {
  try {
    const { statusCode, body } = await EventController.crateEvent(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});
// .delete("/user/:id", async (req, res, next) => {
//   try {
//     const { statusCode, body } = await UserController.deleteUser(req);
//     return res.status(statusCode).send({
//       statusCode,
//       body,
//     });
//   } catch (error) {
//     next(error);
//   }
// })
// .get("/user/:email", async (req, res, next) => {
//   try {
//     const { statusCode, body } = await UserController.selectByEmailUser(req);
//     return res.status(statusCode).send({
//       statusCode,
//       body,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default eventRouter;
