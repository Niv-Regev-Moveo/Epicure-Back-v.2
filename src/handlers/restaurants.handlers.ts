import mongoose from "mongoose";
import { EStatus } from "../enum/status.enum";
import Chef from "../models/chef.model";
import Restaurant, { IRestaurantModel } from "../models/restaurant.model";
import Dish from "../models/chefOfTheWeek.model";

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
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      throw new Error(`Invalid restaurant ID format: ${restaurantId}`);
    }

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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        updatedRestaurantData,
        { new: true }
      ).session(session);

      if (!updatedRestaurant) {
        throw new Error("Restaurant not found");
      }

      if (updatedRestaurantData.status === EStatus.ACTIVE) {
        await Chef.findByIdAndUpdate(
          updatedRestaurant.chef,
          { $addToSet: { restaurants: updatedRestaurant._id } },
          { new: true, useFindAndModify: false }
        ).session(session);
      }

      await session.commitTransaction();
      session.endSession();

      return updatedRestaurant;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating restaurant status:", error);
      throw error;
    }
  },

  async delete(restaurantId: string): Promise<IRestaurantModel | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        { status: EStatus.ARCHIVE },
        { new: true, session: session }
      );

      if (!deletedRestaurant) {
        throw new Error("Restaurant not found");
      }

      await Dish.updateMany(
        { restaurant: restaurantId },
        { status: EStatus.ARCHIVE },
        { session: session }
      );

      await Chef.findByIdAndUpdate(
        deletedRestaurant.chef,
        { $pull: { restaurants: restaurantId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return deletedRestaurant;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error archiving restaurant and its dishes:", error);
      throw error;
    }
  },
};

export default RestaurantHandler;
