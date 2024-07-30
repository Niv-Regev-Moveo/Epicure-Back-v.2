import express from "express";
import * as dishesController from "../controllers/dish.controllers";
import { authMiddleware } from "../middleware/authMiddleWare";

const dishesRoutes = express.Router();

dishesRoutes.get("/", dishesController.getAll);
dishesRoutes.get("/:id", dishesController.getById);
dishesRoutes.post("/", authMiddleware, dishesController.create);
dishesRoutes.put("/:id", authMiddleware, dishesController.update);
dishesRoutes.delete("/:id", authMiddleware, dishesController.deleteDish);

export default dishesRoutes;
