import express from "express";
import { CategoryController } from "../../../presentation/controllers/CategoryController";

const categoryRouter = express.Router();

categoryRouter
  .post("/", async (req, res, next) => {
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
  .delete("/:id", async (req, res, next) => {
    try {
      const { statusCode, body } = await CategoryController.deleteCategory(req);
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/all", async (_req, res, next) => {
    try {
      const { statusCode, body } = await CategoryController.getCategories();
      return res.status(statusCode).send({
        statusCode,
        body,
      });
    } catch (error) {
      next(error);
    }
  });

export default categoryRouter;
