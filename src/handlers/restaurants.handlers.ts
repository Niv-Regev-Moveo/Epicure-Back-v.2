import mongoose from "mongoose";
import { EStatus } from "../../enum/status.enum";
import Chef from "../models/chef.model";
import Restaurant, { IRestaurantModel } from "../models/restaurant.model";

const RestaurantHandler = {
  async getAll(): Promise<IRestaurantModel[]> {
    try {
      const restaurants = await Restaurant.aggregate([
        {
          $match: { status: EStatus.ACTIVE },
        },
      ]);
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  },

  async getById(restaurantId: string): Promise<IRestaurantModel | null> {
    try {
      const result = await Restaurant.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(restaurantId) } },
        {
          $project: {
            name: 1,
            image: 1,
            rating: 1,
            description: 1,
            dishes: 1,
          },
        },
      ]);

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching restaurant by ID:", error);
      throw error;
    }
  },

  async create(restaurantData: IRestaurantModel): Promise<IRestaurantModel> {
    try {
      const newRestaurant = new Restaurant(restaurantData);
      const savedRestaurant = await newRestaurant.save();
      const populatedRestaurant = await savedRestaurant.populate("chef");

      await Chef.findByIdAndUpdate(
        populatedRestaurant.chef,
        { $push: { restaurants: populatedRestaurant._id } },
        { new: true, useFindAndModify: false }
      );

      return populatedRestaurant;
    } catch (error) {
      console.error("Error creating restaurant:", error);
      throw error;
    }
  },

  async update(
    restaurantId: string,
    updatedRestaurantData: Partial<IRestaurantModel>
  ): Promise<IRestaurantModel | null> {
    let updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedRestaurantData,
      {
        new: true,
      }
    );

    if (!updatedRestaurant) {
      return null;
    }
    return updatedRestaurant;
  },
};

export default RestaurantHandler;
