import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const categoryRouterPrivate = express.Router();

categoryRouterPrivate.use(AuthMiddleware.verifyAccessToken);

categoryRouterPrivate
  .delete("/:id", async (req, res, next) => {
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
  });

export default categoryRouterPrivate;
