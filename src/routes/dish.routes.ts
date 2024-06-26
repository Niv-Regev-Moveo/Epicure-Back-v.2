import express from "express";
import * as dishesController from "../controllers/dish.controllers";

const dishesRoutes = express.Router();

dishesRoutes.get("/", dishesController.getAll);
dishesRoutes.get("/:id", dishesController.getById);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.delete("/:id", dishesController.deleteDish);

export default dishesRoutes;
