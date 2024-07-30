import express from "express";
import * as restaurantsController from "../controllers/restaurants.controllers";
import { authMiddleware } from "../middleware/authMiddleWare";

const restaurantsRoutes = express.Router();

restaurantsRoutes.get("/", restaurantsController.getAll);
restaurantsRoutes.get("/:id", restaurantsController.getById);
restaurantsRoutes.post("/", authMiddleware, restaurantsController.create);
restaurantsRoutes.put("/:id", authMiddleware, restaurantsController.update);
restaurantsRoutes.delete(
  "/:id",
  authMiddleware,
  restaurantsController.deleteRestaurant
);

export default restaurantsRoutes;
