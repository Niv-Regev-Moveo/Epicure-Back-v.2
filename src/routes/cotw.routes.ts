import express from "express";
import * as chefOfTheWeekController from "../controllers/cotw.controllers";

const chefOfTheWeekRoutes = express.Router();

chefOfTheWeekRoutes.get("/", chefOfTheWeekController.getChefOfTheWeek);
chefOfTheWeekRoutes.post("/:id", chefOfTheWeekController.create);
chefOfTheWeekRoutes.put("/:id", chefOfTheWeekController.update);
chefOfTheWeekRoutes.delete("/:id", chefOfTheWeekController.deleteChefOfTheWeek);

export default chefOfTheWeekRoutes;
