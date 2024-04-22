import express from "express";
// import { OrderController } from "../../../presentation/controllers/OrderController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { StrikeService } from "../../../infrastructure/stripe/service/index";

const strikeService = new StrikeService();

const orderRouterPrivate = express.Router();

orderRouterPrivate.use(AuthMiddleware.verifyAccessToken);

orderRouterPrivate.post("/create-checkout-session", async (req, res, next) => {
  try {
    const { url } = await strikeService.createCheckoutSession({
      email: req.body.email,
      name: req.body.name,
      priceStripeId: req.body.priceStripeId,
      quantity: +req.body.quantity,
    });

    return res.status(200).send({ body: url });
  } catch (error) {
    next(error);
  }
});

export default orderRouterPrivate;
