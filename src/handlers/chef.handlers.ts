import mongoose from "mongoose";
import Chef, { IChefModel } from "../models/chef.model";
import { EStatus } from "../enum/status.enum";

const ChefHandler = {
  async getAll(): Promise<IChefModel[]> {
    try {
      const chefs = await Chef.find()
        .select("-chefOfTheWeek")
        .populate("restaurants", "name");
      return chefs;
    } catch (error) {
      console.error("Error fetching chefs:", error);
      throw error;
    }
  },

  async getById(chefId: string): Promise<IChefModel | null> {
    if (!mongoose.Types.ObjectId.isValid(chefId)) {
      throw new Error(`Invalid chef ID format: ${chefId}`);
    }

    try {
      const chef = await Chef.findById(chefId)
        .select("-chefOfTheWeek")
        .populate("restaurants", "name")
        .exec();
      return chef;
    } catch (error) {
      console.error("Error fetching chef by ID:", error);
      throw error;
    }
  },

  async create(chefData: IChefModel): Promise<IChefModel> {
    try {
      const newChef = new Chef(chefData);
      const savedChef = await newChef.save();
      return savedChef;
    } catch (error) {
      console.error("Error creating chef:", error);
      throw error;
    }
  },

  async update(
    chefId: string,
    updateChefData: Partial<IChefModel>
  ): Promise<IChefModel | null> {
    if (!mongoose.Types.ObjectId.isValid(chefId)) {
      throw new Error(`Invalid chef ID format: ${chefId}`);
    }

    try {
      const updatedChef = await Chef.findByIdAndUpdate(chefId, updateChefData, {
        new: true,
        select: "-__v -chefOfTheWeek",
      })
        .populate("restaurants", "name")
        .exec();
      return updatedChef;
    } catch (error) {
      console.error("Error updating chef:", error);
      throw error;
    }
  },

  async delete(chefId: string): Promise<IChefModel | null> {
    if (!mongoose.Types.ObjectId.isValid(chefId)) {
      throw new Error(`Invalid chef ID format: ${chefId}`);
    }

    try {
      const deletedChef = await Chef.findByIdAndUpdate(
        chefId,
        { status: EStatus.ARCHIVE },
        { new: true }
      ).exec();
      return deletedChef;
    } catch (error) {
      console.error("Error deleting chef:", error);
      throw error;
    }
  },
};

export default ChefHandler;
