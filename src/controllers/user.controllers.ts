import { Request, Response } from "express";
import UserHandler from "../handlers/user.handlers";
import { IUserModel } from "models/user.model";

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
    const loginResponse = await UserHandler.login(mail, password);
    if (!loginResponse) {
      return res.status(403).json({ message: "Invalid User Details" });
    }

    const { user, token } = loginResponse;
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: IUserModel = req.body;
    const newUser = await UserHandler.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
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
