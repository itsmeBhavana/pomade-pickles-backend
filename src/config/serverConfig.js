import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;
export const ORIGIN_PORT = process.env.ORIGIN_PORT;
