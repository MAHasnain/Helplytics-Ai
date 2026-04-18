import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./logger/morgan.logger.js";
import morgan from "morgan";
import logger from "./logger/winston.logger.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.static("public"));
app.use(helmet());
app.use(cookieParser())

// Morgan middleware for logging HTTP requests, integrated with Winston logger
app.use(morganMiddleware);
app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

// Routes
import authRouter from "./src/routes/auth.route.js";

app.use("/api/auth", authRouter);

export default app;
