import { Request, Response } from "express";
import ChefOfTheWeekHandler from "../handlers/cotw.handlers";
import { deleteChef } from "./chef.controllers";

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await ChefOfTheWeekHandler.getChefOfTheWeek();
    if (!chefOfTheWeek) {
      return res.status(404).json({ message: "Chef of the week not found" });
    }
    res.json(chefOfTheWeek);
  } catch (error) {
    console.error("Error fetching Chef of the Week:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    console.log("Received chef ID:", chefId);

    const newChefOfTheWeek = await ChefOfTheWeekHandler.create(chefId);
    res.status(201).json(newChefOfTheWeek);
  } catch (error) {
    console.error("Error creating Chef of the Week:", error);
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeekId = req.params.id;
    const updatedChefOfTheWeekData = req.body;

    const updatedChefOfTheWeek = await ChefOfTheWeekHandler.update(
      chefOfTheWeekId,
      updatedChefOfTheWeekData
    );
    if (!updatedChefOfTheWeek) {
      return res
        .status(404)
        .json({ message: "Chef of the week to update not found" });
    }
    res.status(200).json(updatedChefOfTheWeek);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeekId = req.params.id;
    const deletedChefOfTheWeek = await ChefOfTheWeekHandler.deleteChefOfTheWeek(
      chefOfTheWeekId
    );
    res.status(200).json(deletedChefOfTheWeek);

    console.warn("Make sure to assign a new Chef of the Week.");
  } catch (error) {
    console.error("Error deleting Chef of the Week:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
