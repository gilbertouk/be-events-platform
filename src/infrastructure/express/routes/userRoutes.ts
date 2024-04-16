import express from "express";
import { UserController } from "../../../presentation/controllers/UserController";

const categoryRouter = express.Router();

categoryRouter.post("/user", async (req, res, next) => {
  try {
    const { statusCode, body } = await UserController.crateUser(req);
    return res.status(statusCode).send({
      statusCode,
      body,
    });
  } catch (error) {
    next(error);
  }
});
// .delete("/category/:id", async (req, res, next) => {
//   try {
//     const { statusCode, body } = await CategoryController.deleteCategory(req);
//     return res.status(statusCode).send({
//       statusCode,
//       body,
//     });
//   } catch (error) {
//     next(error);
//   }
// })
// .get("/categories", async (_req, res, next) => {
//   try {
//     const { statusCode, body } = await CategoryController.getCategories();
//     return res.status(statusCode).send({
//       statusCode,
//       body,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default categoryRouter;
