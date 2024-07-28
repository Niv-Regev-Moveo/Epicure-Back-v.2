import mongoose, { Schema, Document } from "mongoose";
import { IRestaurantModel } from "./restaurant.model";
import { EStatus } from "../enum/status.enum";
import { addVirtualIdAndTransform } from "../utils/schemaUtils";

export interface IChefModel extends Document {
  name: string;
  image: string;
  description: string;
  chefOfTheWeek?: boolean;
  restaurants: mongoose.Types.ObjectId[];
  status: EStatus;
}

const chefSchema = new Schema<IChefModel>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    chefOfTheWeek: { type: Boolean, default: false, required: false },
    restaurants: [
      { type: Schema.Types.ObjectId, ref: "Restaurant", required: false },
    ],
    status: {
      type: String,
      enum: EStatus,
      default: EStatus.ACTIVE,
      required: true,
    },
  },
  { versionKey: false }
);

const Chef = mongoose.model<IChefModel>("Chef", chefSchema);

export default Chef;
