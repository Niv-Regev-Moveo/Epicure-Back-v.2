import User, { IUserModel } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ILoginResponse {
  user: IUserModel;
  token: string;
}

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || "YOUR-SECRET-KEY";

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
      return null;
    }
  },

  async create(userData: IUserModel): Promise<IUserModel> {
    try {
      const existingUser = await User.findOne({ mail: userData.mail });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const hash = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hash;
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  async login(mail: string, password: string): Promise<ILoginResponse | null> {
    try {
      const user = await User.findOne({ mail });
      if (!user) {
        console.error("User not found with email:", mail);
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
          expiresIn: "1m",
        });
        return { user, token };
      } else {
        console.error("Password does not match for user:", mail);
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
