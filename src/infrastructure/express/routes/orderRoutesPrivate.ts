import express from "express";
import { OrderController } from "../../../presentation/controllers/OrderController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

// import { StrikeService } from "../../../infrastructure/stripe/service/index";
// const strikeService = new StrikeService();

const orderRouterPrivate = express.Router();

orderRouterPrivate.use(AuthMiddleware.verifyAccessToken);

orderRouterPrivate.post("/create-checkout-session", async (req, res, next) => {
  try {
    const { statusCode, body } =
      await OrderController.createCheckoutSession(req);
    return res.status(statusCode).send({ body: body.url });
  } catch (error) {
    next(error);
  }
});

export default orderRouterPrivate;
