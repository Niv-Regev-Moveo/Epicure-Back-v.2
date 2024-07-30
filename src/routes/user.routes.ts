import express from "express";
import * as userController from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/authMiddleWare";

const usersRoutes = express.Router();

usersRoutes.get("/:id", authMiddleware, userController.getById);
usersRoutes.delete("/:id", authMiddleware, userController.deleteUser);
usersRoutes.post("/", userController.createUser);
usersRoutes.post("/login", userController.login);

export default usersRoutes;
