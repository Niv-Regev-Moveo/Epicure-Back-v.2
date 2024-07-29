import { Request, Response } from "express";
import UserHandler from "../handlers/user.handlers";
import { log } from "console";

export const getById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserHandler.getById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `"Error: An unexpected error occurred"` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  try {
    const user = await UserHandler.login(mail, password);
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error: An unexpected error occurred" });
  }
};

export const add = async (req: Request, res: Response) => {
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
