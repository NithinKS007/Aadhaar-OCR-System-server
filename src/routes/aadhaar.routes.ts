import express from "express";
import expressAsyncHandler from "express-async-handler";
import { extractAadhaarData } from "../controllers/aadhaar.controller";
import upload from "../utils/multer";
export const aadhaar = express.Router();

/*  
    Route: POST /api/v1/aadhaar/extract
    Purpose: Routes for extracting Aadhaar data from the uploaded front and back side images.
    Middleware:
      - `upload.fields`: Multer middleware to handle file uploads (front and back images).
      - `expressAsyncHandler`: Handles asynchronous controller functions and error handling.

    Incoming:
      - frontSideImage: A file representing the front side image of the Aadhaar card (max count 1).
      - backSideImage: A file representing the back side image of the Aadhaar card (max count 1).

    Returns:
      - Calls `extractAadhaarData` controller to process the images and return extracted Aadhaar information.
      - In case of an error, returns a relevant error response.
*/

aadhaar.post(
  "/extract",
  upload.fields([
    { name: "frontSideImage", maxCount: 1 },
    { name: "backSideImage", maxCount: 1 },
  ]),
  expressAsyncHandler(extractAadhaarData as any) 
);
