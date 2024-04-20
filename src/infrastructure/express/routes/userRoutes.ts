import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";

const categoryRouter = express.Router();

categoryRouter.post("/", async (req, res, next) => {
  try {
    const { statusCode, body } = await UserController.crateUser(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});

export default categoryRouter;
