import express from "express";
import * as userController from "../controllers/user.controllers";

const usersRoutes = express.Router();

usersRoutes.post("/", userController.add);
usersRoutes.delete("/:id", userController.deleteUser);
usersRoutes.post("/login", userController.login);

export default usersRoutes;
