import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),

  CLIENT_URL: process.env.CLIENT_URL!,

  MONGODB_URI: process.env.MONGODB_URI!,
  NODE_ENV: process.env.NODE_ENV,
};
