import { Request, Response } from "express";
import RestaurantHandler from "../handlers/restaurants.handlers";

export const getAll = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantHandler.getAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await RestaurantHandler.getById(restaurantId);

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "The specified Restaurant does not exist" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await RestaurantHandler.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedRestaurantData = req.body;

    const updateRestaurant = await RestaurantHandler.update(
      restaurantId,
      updatedRestaurantData
    );
    res.status(200).send(updateRestaurant);

    if (!updatedRestaurantData) {
      return res
        .status(404)
        .json({ message: "The specified Restaurant does not exist" });
    }
  } catch (error) {
    console.error(`Error updating restaurant ${req.params.id}:`, error);
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await RestaurantHandler.delete(restaurantId);

    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ message: "The specified Restaurant does not exist" });
    }

    res.status(200).json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};
