import express from "express";
import { OrderController } from "../../../presentation/controllers/OrderController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const orderRouterPrivate = express.Router();

orderRouterPrivate.use(AuthMiddleware.verifyAccessToken);

orderRouterPrivate
  .post("/create-checkout-session", async (req, res, next) => {
    try {
      const { statusCode, body } =
        await OrderController.createCheckoutSession(req);
      return res.status(statusCode).send({ body });
    } catch (error) {
      next(error);
    }
  })
  .post("/create-free-order", async (req, res, next) => {
    try {
      const { statusCode, body } = await OrderController.createFreeOrder(req);
      return res.status(statusCode).send({ body });
    } catch (error) {
      next(error);
    }
  });

export default orderRouterPrivate;
