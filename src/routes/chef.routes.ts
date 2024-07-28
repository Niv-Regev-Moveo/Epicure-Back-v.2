import express from "express";
import * as chefController from "../controllers/chef.controllers";

const chefsRoutes = express.Router();

chefsRoutes.get("/", chefController.getAll);
chefsRoutes.get("/:id", chefController.getById);
chefsRoutes.post("/", chefController.create);
chefsRoutes.put("/:id", chefController.update);
chefsRoutes.delete("/:id", chefController.deleteChef);

export default chefsRoutes;
