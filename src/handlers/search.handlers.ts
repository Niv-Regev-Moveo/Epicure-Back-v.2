import Chef, { IChefModel } from "../models/chef.model";
import Dish, { IDishModel } from "../models/dish.model";
import Restaurant, { IRestaurantModel } from "../models/restaurant.model";

interface ISearchResults {
  chefs?: IChefModel[];
  restaurants?: IRestaurantModel[];
  dishes?: IDishModel[];
}

const SearchHandler = {
  async search(keyword: string) {
    const regex = new RegExp(keyword, "i");

    try {
      const chefs = await Chef.find({
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
        status: "active",
      });

      const restaurants = await Restaurant.find({
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
        status: "active",
      }).populate("chef");

      const dishes = await Dish.find({
        $or: [
          { name: { $regex: regex } },
          { ingredients: { $regex: regex } },
          { tags: { $regex: regex } },
        ],
        status: "active",
      }).populate("restaurant");

      const searchResults: ISearchResults = {};

      if (chefs.length) {
        searchResults.chefs = chefs;
      }
      if (restaurants.length) {
        searchResults.restaurants = restaurants;
      }

      if (dishes.length) {
        searchResults.dishes = dishes;
      }
      if (!restaurants.length && !chefs.length && !dishes.length) {
        return "keyword not found";
      }

      return searchResults;
    } catch (error) {
      console.error("Error during search:", error);
      throw error;
    }
  },
};

export default SearchHandler;
