import { Request, Response } from "express";
import SearchHandler from "../handlers/search.handlers";

export const search = async (req: Request, res: Response) => {
  try {
    const keyword: string = req.params.keyword || "";
    const response = await SearchHandler.search(keyword);

    if (typeof response === "string") {
      res.status(404).json({ message: "Keyword not exist in the database" });
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
