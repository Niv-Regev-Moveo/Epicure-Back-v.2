import mongoose, { Schema, Document } from "mongoose";

export interface IChefOfTheWeekModel extends Document {
  name: string;
}

const chefOfTheWeekSchema = new Schema<IChefOfTheWeekModel>(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const ChefOfTheWeek = mongoose.model<IChefOfTheWeekModel>(
  "ChefOfTheWeek",
  chefOfTheWeekSchema
);

export default ChefOfTheWeek;
