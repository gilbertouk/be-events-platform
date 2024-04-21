import { Router } from "express";
import { CloudinaryController } from "../../../presentation/controllers/CloudinaryController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const cloudinaryRouterPrivate = Router();

cloudinaryRouterPrivate.use(
  AuthMiddleware.verifyAccessToken,
  AuthMiddleware.verifyAdminAccess,
);

cloudinaryRouterPrivate.get("/sign-upload-image", async (req, res, next) => {
  try {
    const { statusCode, body } =
      await CloudinaryController.signUploadImage(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});

export default cloudinaryRouterPrivate;
