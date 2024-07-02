import { Router } from "express";
import chefsRoutes from "./chef.routes";
import restaurantsRoutes from "./restaurant.routes";
import dishesRoutes from "./dish.routes";
import searchRoutes from "./search.routes";
import chefOfTheWeekRoutes from "./cotw.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsRoutes);
v1Router.use("/restaurants", restaurantsRoutes);
v1Router.use("/dishes", dishesRoutes);
v1Router.use("/dishes", dishesRoutes);
v1Router.use("/search", searchRoutes);
v1Router.use("/chefOfTheWeek", chefOfTheWeekRoutes);

export default v1Router;
