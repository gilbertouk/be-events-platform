import express from "express";
import { CategoryController } from "../../../presentation/controllers/CategoryController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const categoryRouterAdmin = express.Router();

categoryRouterAdmin.use(
  AuthMiddleware.verifyAccessToken,
  AuthMiddleware.verifyAdminAccess,
);

categoryRouterAdmin
  .post("/category", async (req, res, next) => {
    try {
      const { statusCode, body } = await CategoryController.crateCategory(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .delete("/category/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await CategoryController.deleteCategory(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default categoryRouterAdmin;
