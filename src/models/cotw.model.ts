import mongoose, { Schema, Document } from "mongoose";

export interface IChefOfTheWeek extends Document {
  name: string;
  image: string;
  description: string;
  isChefOfTheWeek: boolean;
}

const chefOfTheWeekSchema = new Schema<IChefOfTheWeek>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  isChefOfTheWeek: { type: Boolean, required: true },
});

const ChefOfTheWeek = mongoose.model<IChefOfTheWeek>(
  "ChefOfTheWeek",
  chefOfTheWeekSchema
);

export default ChefOfTheWeek;
