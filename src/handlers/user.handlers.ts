import User, { IUserModel } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserHandler = {
  async getById(userId: string): Promise<IUserModel | null> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid User ID format: ${userId}`);
    }

    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.error(`Error fetching user by ID:`, error);
    }
  },

  async create(userData: IUserModel): Promise<IUserModel> {
    try {
      const existingUser = await User.findOne({ mail: userData.mail });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async login(mail: string, password: string): Promise<IUserModel | null> {
    try {
      const user = await User.findOne({ mail });
      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("An unexpected error occurred during login");
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
