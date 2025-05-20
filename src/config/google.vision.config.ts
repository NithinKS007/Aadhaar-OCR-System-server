import { ImageAnnotatorClient } from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();
/*  
    Module: Google Cloud Vision Client Setup
    Purpose: Initializes the Google Vision API client using credentials loaded from environment variables.
    Incoming: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON (environment variable containing Google 
    credentials in JSON format)
    Returns: client (Google Vision API client object for making API calls)
*/
const credentials = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string
);
export const client = new ImageAnnotatorClient({ credentials: credentials });
