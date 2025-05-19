import { ImageAnnotatorClient } from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();
const credentials = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string
);
export const client = new ImageAnnotatorClient({ credentials: credentials });
