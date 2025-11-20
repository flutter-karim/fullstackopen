import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import blogRoutes from "./routes/blogRoutes.js";
import { info } from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/", blogRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    info(`Server is running on port: ${PORT}`);
    info(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
