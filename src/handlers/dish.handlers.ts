import Dish, { IDishModel } from "../models/dish.model";
import Restaurant from "../models/restaurant.model";

const DishHandler = {
  async createDish(dishData: IDishModel): Promise<IDishModel> {
    const newDish = new Dish(dishData);
    console.log(newDish);
    const savedDish = await (await newDish.save()).populate("restaurant");

    await Restaurant.findByIdAndUpdate(
      savedDish.restaurant,
      { $push: { dishes: savedDish._id } },
      { new: true, useFindAndModify: false }
    );
    return savedDish;
  },
};

export default DishHandler;
