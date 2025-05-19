import express from "express";
import expressAsyncHandler from "express-async-handler";
import { extractAadhaarData } from "../controllers/aadhaar.controller";
import upload from "../utils/multer";
export const aadhaar = express.Router();

aadhaar.post(
  "/extract",
  upload.fields([
    { name: "frontSideImage", maxCount: 1 },
    { name: "backSideImage", maxCount: 1 },
  ]),
  expressAsyncHandler(extractAadhaarData as any) 
);
