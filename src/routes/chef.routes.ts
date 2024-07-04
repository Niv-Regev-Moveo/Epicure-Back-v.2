import express from "express";
import * as chefController from "../controllers/chef.controllers";

const chefsRouter = express.Router();

chefsRouter.get("/", chefController.getAll);
chefsRouter.get("/:id", chefController.getById);
chefsRouter.post("/", chefController.create);
chefsRouter.put("/:id", chefController.update);
chefsRouter.delete("/:id", chefController.deleteChef);

export default chefsRouter;
