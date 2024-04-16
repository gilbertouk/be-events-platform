import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";

const categoryRouter = express.Router();

categoryRouter
  .post("/user", async (req, res, next) => {
    try {
      const { statusCode, body } = await UserController.crateUser(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .delete("/user/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await UserController.deleteUser(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/user/:email", async (req, res, next) => {
    try {
      const { statusCode, body } = await UserController.selectByEmailUser(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default categoryRouter;
