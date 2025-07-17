import express from "express";
import { aadhaarController, fileService } from "@di/container-resolver";
import { asyncHandler } from "@utils/async-handler";
import { validateAadhaarSchema } from "@middlewares/validationSchemas/file-validation";
import { validate } from "@middlewares/validationMiddleware";
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
  fileService.configureUpload().fields([
    { name: "frontSideImage", maxCount: 1 },
    { name: "backSideImage", maxCount: 1 },
  ]),
  validateAadhaarSchema,validate,
  asyncHandler(aadhaarController.handle.bind(aadhaarController)) 
);
