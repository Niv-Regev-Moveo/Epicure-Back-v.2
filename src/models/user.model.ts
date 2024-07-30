import mongoose, { Schema, Document } from "mongoose";
import { EUser } from "../enum/user.enum";

export interface IUserModel extends Document {
  surname: string;
  mail: string;
  password: string;
  role: EUser;
}

const userSchema = new Schema<IUserModel>(
  {
    surname: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: EUser, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
