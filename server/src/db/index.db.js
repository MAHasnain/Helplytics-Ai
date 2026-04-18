import mongoose from "mongoose";
import logger from "../../logger/winston.logger.js";

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const DB_NAME = "hackathon-project";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        logger.info("⚡ Using existing DB connection");
        return;
    }

    try {
        const conn = await mongoose.connect(
            `${process.env.MONGODB_URI}${DB_NAME}`,
            {
                serverSelectionTimeoutMS: 5000,
            }
        );

        isConnected = conn.connections[0].readyState === 1;

        logger.info(`🍀 MongoDB connected! HOST: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`❌ MONGODB connection error: ${error.message}`);
        throw error; // ❗ NOT process.exit
    }
};

export default connectDB;