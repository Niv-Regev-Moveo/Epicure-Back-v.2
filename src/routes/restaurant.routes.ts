import express from "express";
import * as restaurantsController from "../controllers/restaurants.controllers";

const restaurantsRoutes = express.Router();

restaurantsRoutes.get("/", restaurantsController.getAll);
restaurantsRoutes.get("/:id", restaurantsController.getById);
restaurantsRoutes.post("/", restaurantsController.create);
restaurantsRoutes.put("/:id", restaurantsController.update);
restaurantsRoutes.delete("/:id", restaurantsController.deleteRestaurant);

export default restaurantsRoutes;
