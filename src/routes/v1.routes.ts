import { Router } from "express";
import chefsRoutes from "./chef.routes";
import restaurantsRoutes from "./restaurant.routes";
import dishesRoutes from "./dish.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsRoutes);
v1Router.use("/restaurants", restaurantsRoutes);
v1Router.use("/dishes", dishesRoutes);

export default v1Router;
