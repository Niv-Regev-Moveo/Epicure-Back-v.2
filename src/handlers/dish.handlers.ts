import mongoose from "mongoose";
import { EStatus } from "../enum/status.enum";
import Dish, { IDishModel } from "../models/dish.model";
import Restaurant, { IRestaurantModel } from "../models/restaurant.model";
import Chef from "../models/chef.model";

const DishHandler = {
  async getAll(): Promise<IDishModel[]> {
    try {
      const dishes = await Dish.aggregate([
        {
          $match: { status: EStatus.ACTIVE },
        },
      ]);
      return dishes;
    } catch (error) {
      console.error("Error fetching Dishes:", error);
      throw error;
    }
  },

  async getById(dishId: string): Promise<IDishModel | null> {
    try {
      const result = await Dish.aggregate([
        {
          $match: {
            status: "active",
            _id: new mongoose.Types.ObjectId(dishId),
          },
        },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurantDetails",
          },
        },
        {
          $project: {
            name: 1,
            image: 1,
            type: 1,
            price: 1,
            tags: 1,
            ingredients: 1,
            status: 1,
            restaurantName: "$restaurantDetails.name",
          },
        },
      ]);

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching dish by ID:", error);
      throw error;
    }
  },

  async create(dishData: any) {
    try {
      const newDish = new Dish(dishData);
      const savedDish = await newDish.save();
      const populatedDish = await savedDish.populate("restaurant");

      if (populatedDish && populatedDish.restaurant)
        await Restaurant.findByIdAndUpdate(
          savedDish.restaurant,
          { $push: { dishes: savedDish._id } },
          { new: true, useFindAndModify: false }
        );

      return savedDish;
    } catch (error) {
      console.error("Error creating dish:", error);
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

      if (updatedRestaurantData.status === EStatus.ARCHIVE) {
        await Dish.updateMany(
          { restaurant: restaurantId },
          { status: EStatus.ARCHIVE }
        ).session(session);
      } else if (updatedRestaurantData.status === EStatus.ACTIVE) {
        await Dish.updateMany(
          { restaurant: restaurantId },
          { status: EStatus.ACTIVE }
        ).session(session);

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
      console.error("Error updating restaurant and its dishes:", error);
      throw error;
    }
  },

  async deleteDish(dishId: string): Promise<IDishModel | null> {
    try {
      const deletedDish = await Dish.findByIdAndUpdate(
        dishId,
        { status: EStatus.ARCHIVE },
        { new: true, useFindAndModify: false }
      );

      if (deletedDish) {
        await Restaurant.findByIdAndUpdate(
          deletedDish.restaurant,
          { $pull: { dishes: deletedDish._id } },
          { useFindAndModify: false }
        );
      }

      return deletedDish;
    } catch (error) {
      console.error("Error archiving dish:", error);
      throw error;
    }
  },
};

export default DishHandler;
