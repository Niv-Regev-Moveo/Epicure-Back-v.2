import ChefOfTheWeek, { IChefOfTheWeekModel } from "../models/cotw.model";
import Chef from "../models/chef.model";
import { EStatus } from "../enum/status.enum";
import mongoose from "mongoose";

const ChefOfTheWeekHandler = {
  async getChefOfTheWeek(): Promise<IChefOfTheWeekModel | null> {
    try {
      const chefOfTheWeek = await ChefOfTheWeek.findOne({ status: "active" });
      return chefOfTheWeek;
    } catch (error) {
      console.error("Error fetching Chef of the Week:", error);
      throw error;
    }
  },
  async create(chefId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const chef = await Chef.findById(chefId).session(session);
      if (!chef) {
        throw new Error("Chef not found");
      }

      if (!chef.chefOfTheWeek) {
        throw new Error("Chef is not marked as Chef of the Week");
      }

      const newChefOfTheWeek = new ChefOfTheWeek({
        _id: chef._id,
        name: chef.name,
        image: chef.image,
        description: chef.description,
        status: chef.status,
      });

      const savedChefOfTheWeek = await newChefOfTheWeek.save({ session });

      const oldChefsOfTheWeek = await ChefOfTheWeek.find({
        _id: { $ne: chef._id },
      }).session(session);

      await Chef.updateMany(
        { _id: { $in: oldChefsOfTheWeek.map((chef) => chef._id) } },
        { chefOfTheWeek: false },
        { session }
      );

      await ChefOfTheWeek.deleteMany({ _id: { $ne: chef._id } }, { session });

      await session.commitTransaction();
      session.endSession();

      return savedChefOfTheWeek;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating Chef of the Week:", error);
      throw error;
    }
  },

  async update(
    chefOfTheWeekId: string,
    updatedChefOfTheWeekData: Partial<IChefOfTheWeekModel>
  ): Promise<IChefOfTheWeekModel | null> {
    let updatedChefOfTheWeek = await ChefOfTheWeek.findByIdAndUpdate(
      chefOfTheWeekId,
      updatedChefOfTheWeekData,
      {
        new: true,
      }
    );
    if (!updatedChefOfTheWeek) {
      return null;
    }
    return updatedChefOfTheWeek;
  },

  async deleteChefOfTheWeek(
    chefOfTheWeekId: string
  ): Promise<IChefOfTheWeekModel | null> {
    const session = await ChefOfTheWeek.startSession();
    session.startTransaction();

    try {
      const deletedChefOfTheWeek = await ChefOfTheWeek.findByIdAndUpdate(
        chefOfTheWeekId,
        { status: EStatus.ARCHIVE },
        { new: true }
      ).session(session);

      if (!deletedChefOfTheWeek) {
        throw new Error("Chef of the Week not found");
      }

      await Chef.findByIdAndUpdate(
        chefOfTheWeekId,
        { status: EStatus.ARCHIVE },
        { new: true }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return deletedChefOfTheWeek;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error archiving Chef of the Week:", error);
      throw error;
    }
  },
};

export default ChefOfTheWeekHandler;
