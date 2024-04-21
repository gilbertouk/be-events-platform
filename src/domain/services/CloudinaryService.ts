import cloudinary from "../../config/cloudinary";
import { type SignUploadImageOutput } from "../../usecases/signUploadImage/SignUploadImageOutput";

export class CloudinaryService {
  async signUploadImage(folder: string): Promise<SignUploadImageOutput> {
    try {
      const apiSecret: string | undefined = cloudinary.config().api_secret;
      const cloudName: string | undefined = cloudinary.config().cloud_name;
      const apiKey: string | undefined = cloudinary.config().api_key;

      if (!apiSecret || !cloudName || !apiKey) {
        throw new Error("");
      }

      const timestamp = Math.round(new Date().getTime() / 1000);

      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp,
          folder,
        },
        apiSecret,
      );

      return {
        timestamp,
        signature,
        cloudName,
        apiKey,
        folder,
      };
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
