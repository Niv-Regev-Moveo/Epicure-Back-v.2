import { Router } from "express";
import chefsRoutes from "./chef.routes";
import restaurantsRoutes from "./restaurant.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsRoutes);
v1Router.use("/restaurants", restaurantsRoutes);

export default v1Router;
