import mongoose, { Schema, Document } from "mongoose";
import { IRestaurantModel } from "./restaurant.model";
import { EStatus } from "../enum/status.enum";

export interface IChefModel extends Document {
  name: string;
  image: string;
  description: string;
  chefOfTheWeek: boolean;
  restaurants: IRestaurantModel[];
  status: EStatus;
}

const chefSchema = new Schema<IChefModel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  chefOfTheWeek: { type: Boolean, required: false },
  restaurants: [
    { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  ],
  status: {
    type: String,
    enum: EStatus,
    default: EStatus.ACTIVE,
    required: true,
  },
});

const Chef = mongoose.model<IChefModel>("Chef", chefSchema);

export default Chef;
