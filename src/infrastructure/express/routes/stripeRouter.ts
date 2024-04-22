/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { type Request } from "express";
import { StrikeService, stripe } from "../../stripe/service/index";

const stripeRouter = express.Router();
const strikeService = new StrikeService();

stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res) => {
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
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    }

    switch (event?.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Save an order in your database, marked as 'awaiting payment'
        // createOrder(session);

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          await strikeService.fulfillOrder(session);
        }

        break;
      }

      // case "checkout.session.async_payment_succeeded": {
      //   const session = event.data.object;

      //   // Fulfill the purchase...
      //   fulfillOrder(session);

      //   break;
      // }

      // case "checkout.session.async_payment_failed": {
      //   const session = event.data.object;

      //   // Send an email to the customer asking them to retry their order
      //   emailCustomerAboutFailedPayment(session);

      //   break;
      // }
    }

    return res.status(200).end();
  },
);

export default stripeRouter;

// const createOrder = (session: any): void => {
//   // TODO: fill me in
//   console.log("Creating order", session);
// };

// const emailCustomerAboutFailedPayment = (session: any): void => {
//   // TODO: fill me in
//   console.log("Emailing customer", session);
// };
