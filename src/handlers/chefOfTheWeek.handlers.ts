import ChefOfTheWeek, {
  IChefOfTheWeekModel,
} from "../models/chefOfTheWeek.model";
import Chef from "../models/chef.model";
import { EStatus } from "../enum/status.enum";
import mongoose from "mongoose";

const ChefOfTheWeekHandler = {
  async getChefOfTheWeek(): Promise<IChefOfTheWeekModel | null> {
    try {
      const chefOfTheWeek = await ChefOfTheWeek.findOne();
      return chefOfTheWeek;
    } catch (error) {
      console.error("Error fetching Chef of the Week:", error);
      throw error;
    }
  },

  async create(chefId: string): Promise<{ _id: string; name: string } | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const chef = await Chef.findById({
        _id: chefId,
        status: EStatus.ACTIVE,
      }).session(session);
      if (!chef) {
        throw new Error("Chef not found");
      }

      await Chef.findByIdAndUpdate(
        chefId,
        { chefOfTheWeek: true },
        { session }
      );

      const newChefOfTheWeek = new ChefOfTheWeek({
        _id: chef._id,
        name: chef.name,
      });

      const savedChefOfTheWeek = await newChefOfTheWeek.save({ session });

      const oldChefsOfTheWeek = await ChefOfTheWeek.find({
        _id: { $ne: chef._id },
      }).session(session);

      await ChefOfTheWeek.deleteMany({ _id: { $ne: chef._id } }).session(
        session
      );

      await Chef.updateMany(
        { _id: { $in: oldChefsOfTheWeek.map((chef) => chef._id) } },
        { chefOfTheWeek: false },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return { _id: chef._id.toString(), name: savedChefOfTheWeek.name };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating Chef of the Week:", error);
      throw error;
    }
  },
};

export default ChefOfTheWeekHandler;
