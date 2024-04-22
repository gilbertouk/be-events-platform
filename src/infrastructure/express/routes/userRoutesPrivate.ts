import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const userRouterPrivate = express.Router();

userRouterPrivate.use(AuthMiddleware.verifyAccessToken);

userRouterPrivate
  .get("/:email", async (req, res, next) => {
    try {
      const { statusCode, body } = await UserController.selectByEmailUser(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/orders/:email", async (req, res, next) => {
    try {
      const { statusCode, body } =
        await UserController.selectOrdersByUserEmail(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default userRouterPrivate;
