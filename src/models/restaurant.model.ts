import mongoose, { Schema, Document } from "mongoose";
import { IChefModel } from "./chef.model";
import { IDishModel } from "./dish.model";
import { EStatus } from "../../enum/status.enum";
export interface IRestaurantModel extends Document {
  name: string;
  image: string;
  rating: number;
  description: string;
  chef: IChefModel;
  dishes: IDishModel[];
  status: EStatus;
}

const restaurantSchema = new Schema<IRestaurantModel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish", required: true }],
  status: {
    type: String,
    enum: EStatus,
    default: EStatus.ACTIVE,
    required: true,
  },
});

const Restaurant = mongoose.model<IRestaurantModel>(
  "Restaurant",
  restaurantSchema
);

export default Restaurant;
