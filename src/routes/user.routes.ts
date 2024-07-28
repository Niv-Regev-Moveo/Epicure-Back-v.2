import express from "express";
import * as userController from "../controllers/user.controllers";

const usersRoutes = express.Router();

usersRoutes.get("/", userController.getAll);
usersRoutes.post("/", userController.create);
usersRoutes.delete("/:id", userController.deleteUser);
export default usersRoutes;
