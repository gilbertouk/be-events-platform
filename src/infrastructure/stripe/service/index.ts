import Stripe from "stripe";
import { stripeConfig } from "../../../config/stripe";

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
}
