import mongoose from "mongoose";

import env from "./env.js";

let connectionPromise;

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(env.mongoUri)
      .then((connection) => {
        console.log(`MongoDB connected: ${connection.connection.host}`);

        return connection.connection;
      })
      .catch((error) => {
        connectionPromise = null;

        console.error("MongoDB connection failed:", error.message);

        throw error;
      });
  }

  return connectionPromise;
};

export default connectDatabase;
