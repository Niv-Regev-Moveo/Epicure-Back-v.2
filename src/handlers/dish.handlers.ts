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
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurantDetails",
          },
        },
        {
          $unwind: "$restaurantDetails",
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
      return dishes;
    } catch (error) {
      console.error("Error fetching dishes:", error);
      throw error;
    }
  },

  async getById(dishId: string): Promise<IDishModel | null> {
    try {
      const result = await Dish.aggregate([
        {
          $match: {
            status: EStatus.ACTIVE,
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
          $unwind: "$restaurantDetails",
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
            // restaurant: "$restaurantDetails.name",
          },
        },
      ]);

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching dish by ID:", error);
      throw error;
    }
  },

  async create(dishData: IDishModel): Promise<IDishModel> {
    try {
      const newDish = new Dish(dishData);
      const savedDish = await newDish.save();
      const populatedDish = await savedDish.populate("restaurant");

      if (populatedDish && populatedDish.restaurant)
        await Restaurant.findByIdAndUpdate(
          populatedDish.restaurant,
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
    dishId: string,
    updatedDishData: Partial<IDishModel>
  ): Promise<IDishModel | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedDish = await Dish.findByIdAndUpdate(
        dishId,
        updatedDishData,
        { new: true, useFindAndModify: false, session }
      );

      if (!updatedDish) {
        throw new Error("Dish not found");
      }

      const populatedDish = await Dish.findById(dishId)
        .populate("restaurant")
        .select("-__v");

      if (updatedDishData.status === EStatus.ACTIVE && populatedDish) {
        await Restaurant.findByIdAndUpdate(
          populatedDish.restaurant._id,
          { $addToSet: { dishes: populatedDish._id } },
          { new: true, useFindAndModify: false, session }
        );
      }

      await session.commitTransaction();
      session.endSession();

      return populatedDish;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating dish:", error);

      if (error.name === "ValidationError") {
        console.error("Validation Error:", error.message);
      }

      throw error;
    }
  },
  async delete(dishId: string): Promise<IDishModel | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedDish = await Dish.findByIdAndUpdate(
        dishId,
        { status: EStatus.ARCHIVE },
        { new: true, session: session }
      );

      if (!deletedDish) {
        throw new Error("Dish not found");
      }

      await session.commitTransaction();
      session.endSession();

      return deletedDish;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error archiving dish:", error);
      throw error;
    }
  },
};

export default DishHandler;
