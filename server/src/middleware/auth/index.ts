import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../types/auth";

export const authMiddleware =
  ({ required = true } = {}) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (required) {
        return res.status(401).json({
          error: true,
          message: "No token provided",
        });
      }
      return next();
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      if (required) {
        return res.status(401).json({
          error: true,
          message: "Invalid authorization format",
        });
      }
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };

      req.user = decoded;
      next();
    } catch {
      if (required) {
        return res.status(401).json({
          error: true,
          message: "Invalid or expired token",
        });
      }
      next();
    }
  };
