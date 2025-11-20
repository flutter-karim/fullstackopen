import mongoose from "mongoose";
import { info, error } from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOO_URL, {
      dbName: process.env.MONGOO_DB,
    });
    info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    error(`MongoDB error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
