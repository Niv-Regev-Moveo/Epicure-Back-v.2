import { EStatus } from "../enum/status.enum";
import mongoose, { Schema, Document } from "mongoose";

export interface IChefOfTheWeekModel extends Document {
  name: string;
}

const chefOfTheWeekSchema = new Schema<IChefOfTheWeekModel>({
  name: { type: String, required: true },
});

const ChefOfTheWeek = mongoose.model<IChefOfTheWeekModel>(
  "ChefOfTheWeek",
  chefOfTheWeekSchema
);

export default ChefOfTheWeek;
