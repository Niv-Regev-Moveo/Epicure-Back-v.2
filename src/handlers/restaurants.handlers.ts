import mongoose from "mongoose";
import { EStatus } from "../enum/status.enum";
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
        {
          $match: {
            status: "active",
            _id: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $lookup: {
            from: "chefs",
            localField: "chef",
            foreignField: "_id",
            as: "chefDetails",
          },
        },
        {
          $lookup: {
            from: "dishes",
            localField: "_id",
            foreignField: "restaurant",
            as: "dishesDetails",
          },
        },
        {
          $project: {
            name: 1,
            image: 1,
            rating: 1,
            description: 1,
            dishes: {
              $filter: {
                input: "$dishesDetails",
                as: "dish",
                cond: { $eq: ["$$dish.status", "active"] },
              },
            },
            chefName: { $arrayElemAt: ["$chefDetails.name", 0] },
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

      if (populatedRestaurant && populatedRestaurant.chef)
        // need to check
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

  async delete(restaurantId: string): Promise<IRestaurantModel | null> {
    const deletedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { status: EStatus.ARCHIVE },
      {
        new: true,
      }
    );
    return deletedRestaurant;
  },
};

export default RestaurantHandler;
