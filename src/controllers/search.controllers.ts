import { Request, Response } from "express";
import SearchHandler from "../handlers/search.handlers";

export const search = async (req: Request, res: Response) => {
  try {
    const keyword: string = req.params.keyword || "";
    console.log(`Received search request with keyword: ${keyword}`);
    const response = await SearchHandler.search(keyword);

    if (typeof response === "string") {
      console.log(response);
      res.status(404).json({ message: response });
    } else {
      console.log("Search results:", JSON.stringify(response, null, 2));
      res.json(response);
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
