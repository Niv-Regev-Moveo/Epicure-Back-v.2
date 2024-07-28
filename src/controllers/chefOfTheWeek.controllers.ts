import { Request, Response } from "express";
import ChefOfTheWeekHandler from "../handlers/chefOfTheWeek.handlers";

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await ChefOfTheWeekHandler.getChefOfTheWeek();
    if (!chefOfTheWeek) {
      return res
        .status(404)
        .json({ message: "Chef of the week does not exist" });
    }
    res.status(200).json(chefOfTheWeek);
  } catch (error) {
    console.error("Error fetching Chef of the Week:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;

    const newChefOfTheWeek = await ChefOfTheWeekHandler.create(chefId);
    res.status(201).json(newChefOfTheWeek);
  } catch (error) {
    console.error("Error creating Chef of the Week:", error);
    res.status(400).json({ message: error.message });
  }
};
