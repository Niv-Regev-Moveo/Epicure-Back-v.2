import { EStatus } from "../enum/status.enum";
import mongoose, { Schema, Document } from "mongoose";

export interface IChefOfTheWeekModel extends Document {
  name: string;
  image: string;
  description: string;
  status: EStatus;
}

const chefOfTheWeekSchema = new Schema<IChefOfTheWeekModel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: EStatus,
    default: EStatus.ACTIVE,
    required: true,
  },
});

const ChefOfTheWeek = mongoose.model<IChefOfTheWeekModel>(
  "ChefOfTheWeek",
  chefOfTheWeekSchema
);

export default ChefOfTheWeek;
