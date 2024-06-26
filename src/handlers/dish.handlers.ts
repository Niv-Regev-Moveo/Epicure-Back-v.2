import mongoose from "mongoose";
import { EStatus } from "../enum/status.enum";
import Dish, { IDishModel } from "../models/dish.model";
import Restaurant from "../models/restaurant.model";

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
    dishId: string,
    updatedDishData: Partial<IDishModel>
  ): Promise<IDishModel | null> {
    try {
      const { _id, ...updateData } = updatedDishData;
      console.log("Updating Dish:", dishId, updateData);

      const updatedDish = await Dish.findByIdAndUpdate(dishId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedDish) {
        console.log("Dish not found after update attempt");
        return null;
      }

      console.log("Dish updated successfully:", updatedDish);
      return updatedDish;
    } catch (error) {
      console.error("Error updating dish:", error);
      throw error;
    }
  },
  async deleteDish(dishId: string): Promise<IDishModel | null> {
    try {
      // Update the status of the dish to "archive"
      const deletedDish = await Dish.findByIdAndUpdate(
        dishId,
        { status: EStatus.ARCHIVE },
        { new: true, useFindAndModify: false }
      );

      if (deletedDish) {
        // Remove the dish from the restaurant's dishes array if it's archived
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
