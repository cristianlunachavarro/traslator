import { Response } from "express";

import { TranslationHistory } from "../../models/history";
import type { AuthRequest } from "../../types/auth";

export const fetchHistories = async (req: AuthRequest, res: Response) => {
  const { user } = req;
  console.log("user", user);

  if (!user) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid credentials" });
  }

  try {
    const response = await TranslationHistory.findAll({
      where: { userId: user.id },
    });
    if (!response) {
      return res
        .status(401)
        .json({ error: true, message: "Error fetching Histories" });
    }
    return res.status(200).json({ error: false, message: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while fetching histories",
    });
  }
};
