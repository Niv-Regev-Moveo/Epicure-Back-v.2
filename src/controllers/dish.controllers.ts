import { Request, Response } from "express";
import DishHandler from "../handlers/dish.handlers";

export const getAll = async (req: Request, res: Response) => {
  try {
    const dishes = await DishHandler.getAll();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const dish = await DishHandler.getById(dishId);
    if (!dish) {
      return res
        .status(404)
        .json({ message: "The specified Dish does not exist" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newDish = await DishHandler.create(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    console.error("Error in createDish controller:", error); // Log error details
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const updatedDishData = req.body;

    const updatedDish = await DishHandler.update(dishId, updatedDishData);

    if (!updatedDish) {
      return res
        .status(404)
        .json({ message: "The specified Dish does not exist" });
    }

    res.status(200).send(updatedDish);
  } catch (error) {
    console.error("Error during dish update:", error);
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await DishHandler.delete(dishId);

    if (!deletedDish) {
      return res
        .status(404)
        .json({ message: "The specified Dish does not exist" });
    }

    res.json(deletedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
