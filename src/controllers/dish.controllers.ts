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
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const dishData = req.body;
    console.log("Received data for new dish:", dishData);

    const newDish = await DishHandler.create(dishData);

    res.status(201).json(newDish);
  } catch (error) {
    console.error("Error in createDish controller:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const updatedDishData = req.body;

    console.log("Dish ID:", dishId);
    console.log("Updated Dish Data:", updatedDishData);

    const updatedDish = await DishHandler.update(dishId, updatedDishData);

    if (!updatedDish) {
      console.log("Dish not found after update attempt");
      return res.status(404).json({ message: "Dish not found" });
    }

    console.log("Dish successfully updated:", updatedDish);
    res.status(200).send(updatedDish);
  } catch (error) {
    console.error("Error during dish update:", error);
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await DishHandler.deleteDish(dishId);
    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    console.log("Dish status updated to Archive :", deletedDish);

    res.json(deletedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
