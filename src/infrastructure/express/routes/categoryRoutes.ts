import express from "express";
import { CategoryController } from "../../../presentation/controllers/CategoryController";

const categoryRouter = express.Router();

categoryRouter.post("/category", async (req, res, next) => {
  try {
    const { statusCode, body } = await CategoryController.crateCategory(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});

export default categoryRouter;
