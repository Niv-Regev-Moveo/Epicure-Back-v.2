import User, { IUserModel } from "../models/user.model";
import mongoose from "mongoose";

const UserHandler = {
  async getAll(): Promise<IUserModel[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async create(userData: IUserModel): Promise<IUserModel> {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  async delete(userId: string): Promise<IUserModel | null> {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error("Error archiving restaurant and its dishes:", error);
      throw error;
    }
  },
};

export default UserHandler;
