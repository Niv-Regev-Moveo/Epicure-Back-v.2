import express from "express";
import * as chefOfTheWeekController from "../controllers/cotw.controllers";

const chefOfTheWeekRoutes = express.Router();

chefOfTheWeekRoutes.get("/", chefOfTheWeekController.getChefOfTheWeek);
chefOfTheWeekRoutes.post("/", chefOfTheWeekController.create);
// chefOfTheWeekRoutes.put("/:id", cotwControllers.update);
// chefOfTheWeekRoutes.delete("/:id", cotwControllers.deleteChefOfTheWeek);

export default chefOfTheWeekRoutes;
