import express from "express";
import * as searchControllers from "../controllers/search.controllers";

const searchRoutes = express.Router();

searchRoutes.get("/:keyword", searchControllers.search);

export default searchRoutes;
