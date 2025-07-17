import { ITextExtractService } from "@interfaces/services/IServices";
import { injectable } from "inversify";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import dotenv from "dotenv";
import { StatusMessages } from "@utils/http.status.messages";
import { StatusCodes } from "@utils/http.status.codes";
import { AppError } from "@utils/app.error";
dotenv.config();

/*  
    Module: Text Extraction Service with Google Cloud Vision
    Purpose: Extracts text from an image buffer using the Google Vision API's text detection capabilities.
    Description: 
      - This service uses the Google Cloud Vision API to perform optical character recognition (OCR) on images.
      - The image is passed as a buffer, and the `textDetection` API is called to extract any text present in the image.
      - If no text is detected, an error is thrown with a relevant message.
    Incoming:
      - `imageBuffer`: A Buffer object containing the image data to be processed by the Vision API.
    Returns: 
      - The extracted text from the image, if detected.
      - Throws an error if no text is detected in the image.
*/

if (
  !process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON ||
  typeof process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON !== "string"
) {
  throw new AppError(StatusMessages.NO_ENV, StatusCodes.BAD_REQUEST);
}

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const client = new ImageAnnotatorClient({ credentials: credentials });

@injectable()
export class TextExtractService implements ITextExtractService {
  async extract(imageBuffer: Buffer): Promise<string> {
    const [result] = await client.textDetection(imageBuffer);
    const detections = result?.fullTextAnnotation?.text;

    if (!detections) {
      throw new AppError(
        StatusMessages.FAILED_TO_EXTRACT_AADHAAR,
        StatusCodes.BAD_REQUEST
      );
    }

    return detections;
  }
}
