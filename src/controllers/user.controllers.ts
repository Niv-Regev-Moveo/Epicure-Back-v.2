import { Request, Response } from "express";
import UserHandler from "../handlers/user.handlers";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserHandler.getAll();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newUser = await UserHandler.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserHandler.delete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "The specified User does not exist" });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error("Error in deleteUser controller:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
