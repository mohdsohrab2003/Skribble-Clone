import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions } from "./config/cors.js";

import routes from "./routes/index.js";

import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// 404
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
