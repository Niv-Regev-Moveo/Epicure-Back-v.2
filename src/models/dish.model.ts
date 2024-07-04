import mongoose, { Schema, Document } from "mongoose";

import { IRestaurantModel } from "./restaurant.model";
import { EStatus } from "../enum/status.enum";
import { EIconMeaning } from "../enum/iconMeaning.enum";

export interface IDishModel extends Document {
  name: string;
  image: string;
  type?: EIconMeaning | null;
  price: number;
  tags?: string[];
  ingredients: string[];
  restaurant: IRestaurantModel;
  status: EStatus;
}

const dishSchema = new Schema<IDishModel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: EIconMeaning, default: null, required: false },
  price: { type: Number, required: true },
  tags: [{ type: String, required: false }],
  ingredients: [{ type: String, required: true }],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  status: {
    type: String,
    enum: EStatus,
    default: EStatus.ACTIVE,
    required: true,
  },
});

const Dish = mongoose.model<IDishModel>("Dish", dishSchema);

export default Dish;
