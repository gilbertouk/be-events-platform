import { CloudinaryService } from "../../domain/services/CloudinaryService";
import { type SignUploadImageOutput } from "./SignUploadImageOutput";

const cloudinaryService = new CloudinaryService();

export class SignUploadImageUseCase {
  async signUploadImage(folder: string): Promise<SignUploadImageOutput> {
    return await cloudinaryService.signUploadImage(folder);
  }
}
