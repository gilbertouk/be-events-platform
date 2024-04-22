import Stripe from "stripe";
import { stripeConfig } from "../../../config/stripe";
import { UpdateOrderUseCase } from "src/usecases/updateOrderStatus/UpdateOrderStatusUseCase";

export const stripe = new Stripe(stripeConfig.secretKey ?? "", {
  apiVersion: "2024-04-10",
  httpClient: Stripe.createFetchHttpClient(),
});

interface Price {
  currency: string;
  unit_amount_decimal: string;
}

interface ProductInput {
  name: string;
  description: string;
  default_price_data: Price;
  images: string[];
}

interface ProductOutput {
  prodStripeId: string;
  priceStripeId: string;
}

interface SessionInput {
  email: string;
  name: string;
  priceStripeId: string;
  quantity: number;
  eventId: string;
}

interface StripeCustomer {
  email: string;
  name: string;
}

const updateOrderUseCase = new UpdateOrderUseCase();

export class StrikeService {
  async createProduct(input: ProductInput): Promise<ProductOutput> {
    try {
      const product = await stripe.products.create({
        name: input.name,
        description: input.description,
        active: true,
        default_price_data: input.default_price_data,
        images: input.images,
      });

      return {
        prodStripeId: product.id,
        priceStripeId: product.default_price as string,
      };
    } catch (error) {
      throw new Error();
    }
  }

  async getStripeCustomerByEmail(email: string): Promise<Stripe.Customer> {
    try {
      const customers = await stripe.customers.list({ email });
      return customers.data[0];
    } catch (error) {
      throw new Error();
    }
  }

  async createStripeCustomer(input: StripeCustomer): Promise<Stripe.Customer> {
    try {
      const customer = await this.getStripeCustomerByEmail(input.email);
      if (customer) return customer;

      const createdCustomer = await stripe.customers.create({
        email: input.email,
        name: input.name,
      });

      return createdCustomer;
    } catch (error) {
      throw new Error();
    }
  }

  async createCheckoutSession(input: SessionInput): Promise<any> {
    try {
      const customer = await this.createStripeCustomer({
        email: input.email,
        name: input.name,
      });

      const session = await stripe.checkout.sessions.create({
        currency: "gbp",
        customer: customer.id,
        mode: "payment",
        success_url: stripeConfig.successUrl,
        cancel_url: stripeConfig.cancelUrl,
        line_items: [
          {
            price: input.priceStripeId,
            quantity: input.quantity,
          },
        ],
      });

      return {
        session,
      };
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }

  async fulfillOrder(session: any): Promise<void> {
    // TODO: fill me in
    console.log("Fulfilling order status");
    await updateOrderUseCase.updateStatus({
      sessionStripeId: session.id,
      statusStripeId: session.status,
      paymentStripeId: session.payment_intent,
    });
  }
}
