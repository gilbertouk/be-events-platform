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
    console.log("Original URL: " + req.originalUrl);
    console.log("header signature:", sig);
    console.log("API WEBHOOK:", process.env.STRIPE_SECRET_WEBHOOK);
    console.log("Request body: ", req.body);

    if (!process.env.STRIPE_SECRET_WEBHOOK) {
      throw new Error("Strike webhook secret not found");
    }

    let event;

    if (sig) {
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_SECRET_WEBHOOK,
        );
      } catch (err: any) {
        console.error(err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    }

    console.log("✅ Success:", event?.id);

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
