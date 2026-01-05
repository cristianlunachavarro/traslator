import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sequelize } from "./db";
import "reflect-metadata";

import translateRoutes from "./routes/translate";
import languageRoutes from "./routes/languages";
import userRoutes from "./routes/user";
import historyRoutes from "./routes/history";


async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ DB connected");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api/user", userRoutes);
    app.use("/api/translate", translateRoutes);
    app.use("/api/languages", languageRoutes);
    app.use("/api/history", historyRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer();
