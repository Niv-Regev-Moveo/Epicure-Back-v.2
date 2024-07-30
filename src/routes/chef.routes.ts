import express from "express";
import * as chefController from "../controllers/chef.controllers";
import { authMiddleware } from "../middleware/authMiddleWare";

const chefsRoutes = express.Router();

chefsRoutes.get("/", chefController.getAll);
chefsRoutes.get("/:id", chefController.getById);
chefsRoutes.post("/", authMiddleware, chefController.create);
chefsRoutes.put("/:id", authMiddleware, chefController.update);
chefsRoutes.delete("/:id", authMiddleware, chefController.deleteChef);

export default chefsRoutes;
