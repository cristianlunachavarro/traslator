import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const languagesList = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../utils/languageList.json"), "utf8")
) as any;

export const getLanguages = async (req: Request, res: Response) => {
  try {
    return res.json({ error: false, message: languagesList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while fetching languages.",
    });
  }
};
