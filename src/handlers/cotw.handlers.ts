import ChefOfTheWeek, { IChefOfTheWeekModel } from "../models/cotw.model";
import Chef from "../models/chef.model";

const ChefOfTheWeekHandler = {
  async getChefOfTheWeek(): Promise<IChefOfTheWeekModel | null> {
    try {
      const chefOfTheWeek = await ChefOfTheWeek.findOne({
        chefOfTheWeek: true,
      });
      return chefOfTheWeek;
    } catch (error) {
      console.error("Error fetching Chef of the Week:", error);
      throw error;
    }
  },

  async createChefOfTheWeek(chefId: string) {
    // Find the chef by ID
    const chef = await Chef.findById(chefId);
    if (!chef) {
      throw new Error("Chef not found");
    }

    // Ensure the chef has chefOfTheWeek set to true
    if (!chef.chefOfTheWeek) {
      throw new Error("Chef is not marked as Chef of the Week");
    }

    // Create the new ChefOfTheWeek document
    const newChefOfTheWeek = new ChefOfTheWeek({
      name: chef.name,
      image: chef.image,
      description: chef.description,
      status: chef.status,
    });

    // Save the new ChefOfTheWeek document
    const savedChefOfTheWeek = await newChefOfTheWeek.save();
    return savedChefOfTheWeek;
  },
};

export default ChefOfTheWeekHandler;
