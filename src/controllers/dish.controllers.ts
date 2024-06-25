import { Request, Response } from "express";
import DishHandler from "../handlers/dish.handlers";

export const createDish = async (req: Request, res: Response) => {
  try {
    console.log("dish controller");
    const newDish = await DishHandler.createDish(req.body);
    console.log(newDish);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
