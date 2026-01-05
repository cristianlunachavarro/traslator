import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { AuthRequest } from "../../types/auth";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: true, message: "Missing fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      passwordHash: hash,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      error: false,
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }

    console.error("Error creating user", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: true, message: "Missing fields" });
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username }],
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      error: false,
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Error login user", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

export const logoutUser = async (_req: Request, res: Response) => {
  return res.status(200).json({
    error: false,
    message: "User logged out successfully",
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  return res.status(200).json({
    error: false,
    user: req.user,
  });
};
