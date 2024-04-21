import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const userRouterAdmin = express.Router();

userRouterAdmin.use(AuthMiddleware.verifyAdminAccess);

userRouterAdmin.delete("/:id", async (req, res, next) => {
  try {
    const { statusCode, body } = await UserController.deleteUser(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});

export default userRouterAdmin;
