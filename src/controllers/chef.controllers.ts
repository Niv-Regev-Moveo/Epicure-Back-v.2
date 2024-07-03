import { Request, Response } from "express";
import ChefHandler from "../handlers/chef.handlers";

export const getAll = async (req: Request, res: Response) => {
  try {
    const chefs = await ChefHandler.getAll();
    res.json(chefs);
    console.log(chefs);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const chef = await ChefHandler.getById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(chef);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newChef = await ChefHandler.create(req.body);
    console.log(req.body);
    res.status(201).json(newChef);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const updateChefData = req.body;

    const updatedChef = await ChefHandler.update(chefId, updateChefData);
    if (!updatedChef) {
      return res.status(404).send({ message: "Chef not found" });
    }

    res.status(200).json(updatedChef);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const deletedChef = await ChefHandler.delete(chefId);
    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    // console.log(deleteChef);
    console.log(deletedChef);
    res.json(deletedChef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
