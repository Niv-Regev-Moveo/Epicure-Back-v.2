import mongoose from "mongoose";
import Chef, { IChefModel } from "../models/chef.model";
import { EStatus } from "../enum/status.enum";

const ChefHandler = {
  async getAll(): Promise<IChefModel[]> {
    try {
      console.log("Fetching all chefs");
      const chefs = await Chef.aggregate([
        { $match: { status: EStatus.ACTIVE } },
      ]);
      console.log("Fetched chefs:", chefs);
      return chefs;
    } catch (error) {
      console.error("Error fetching chefs:", error);
      throw error;
    }
  },

  async getById(chefId: string): Promise<IChefModel | null> {
    try {
      const result = await Chef.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(chefId) } },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurants",
            foreignField: "_id",
            as: "restaurantDetails",
          },
        },
        {
          $project: {
            name: 1,
            image: 1,
            restaurants: {
              $filter: {
                input: "$restaurantDetails",
                as: "restaurant",
                cond: { $eq: ["$$restaurant.status", "active"] },
              },
            },
          },
        },
      ]);

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching chef by ID:", error);
      throw error;
    }
  },

  async create(chefData: IChefModel): Promise<IChefModel> {
    const newChef = new Chef(chefData);
    const savedChef = await newChef.save();
    console.log(savedChef);
    return savedChef;
  },

  async update(
    chefId: string,
    updateChefData: Partial<IChefModel>
  ): Promise<IChefModel | null> {
    let updateChef = await Chef.findByIdAndUpdate(chefId, updateChefData, {
      new: true,
    });
    if (!updateChef) {
      return null;
    }
    return updateChef;
  },

  async delete(chefId: string): Promise<IChefModel | null> {
    const deletedChef = await Chef.findByIdAndUpdate(
      chefId,
      { status: EStatus.ARCHIVE },
      { new: true }
    );
    return deletedChef;
  },
};

export default ChefHandler;
