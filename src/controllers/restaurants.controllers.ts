import { Request, Response } from "express";
import RestaurantHandler from "../handlers/restaurants.handlers";

export const getAll = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantHandler.getAll();
    res.json(restaurants);
    console.log(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await RestaurantHandler.getById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await RestaurantHandler.create(req.body);
    console.log(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedRestaurantData = req.body;

    console.log("Restaurant ID:", restaurantId);
    console.log("Updated restaurant Data:", updatedRestaurantData);

    const updateRestaurant = await RestaurantHandler.update(
      restaurantId,
      updatedRestaurantData
    );
    res.status(200).send(updateRestaurant);
    console.log(updatedRestaurantData);

    if (!updatedRestaurantData) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {};
