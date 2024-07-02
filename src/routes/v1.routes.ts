import { Router } from "express";
import chefsRoutes from "./chef.routes";
import restaurantsRoutes from "./restaurant.routes";
import dishesRoutes from "./dish.routes";
import searchRoutes from "./search.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsRoutes);
v1Router.use("/restaurants", restaurantsRoutes);
v1Router.use("/dishes", dishesRoutes);
v1Router.use("/search", searchRoutes);

export default v1Router;
