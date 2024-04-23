/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { type Response, type Request } from "express";
import { StrikeService, stripe } from "../../stripe/service/index";

const stripeRouter = express.Router();
const strikeService = new StrikeService();

stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig: string | string[] | undefined = req.headers["stripe-signature"];

    let event;

    if (sig) {
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_SECRET_WEBHOOK ?? "",
        );
      } catch (err: any) {
        console.log(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    }

    switch (event?.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status === "paid") {
          await strikeService.fulfillOrder(session);
        }

        break;
      }
    }

    return res.status(200).end();
  },
);

export default stripeRouter;
