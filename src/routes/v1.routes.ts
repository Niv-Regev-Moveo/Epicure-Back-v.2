import { Router } from "express";
import chefsRoutes from "./chef.routes";
import restaurantsRoutes from "./restaurant.routes";
import dishesRoutes from "./dish.routes";
import searchRoutes from "./search.routes";
import chefOfTheWeekRoutes from "../routes/chefOfTheWeek.routes";
import userRoutes from "./user.routes";
// import protectedRoutes from "./secure.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsRoutes);
v1Router.use("/restaurants", restaurantsRoutes);
v1Router.use("/dishes", dishesRoutes);
v1Router.use("/search", searchRoutes);
v1Router.use("/chefOfTheWeek", chefOfTheWeekRoutes);
v1Router.use("/users", userRoutes);
// v1Router.use("/protected", protectedRoutes);

export default v1Router;
