import express from "express";
import * as chefOfTheWeekController from "../controllers/chefOfTheWeek.controllers";

const chefOfTheWeekRoutes = express.Router();

chefOfTheWeekRoutes.get("/", chefOfTheWeekController.getChefOfTheWeek);
chefOfTheWeekRoutes.post("/:id", chefOfTheWeekController.create);

export default chefOfTheWeekRoutes;
