import { client } from "../config/google.vision.config";
import { AppError } from "./app.error";
import { StatusCodes } from "./http.status.codes";
import { StatusMessages } from "./http.status.messages";

/*  
    Function: extractText
    Purpose: Extracts text from an image buffer using Google Vision API's text detection.
    Incoming: { imageBuffer: <Buffer> } (A Buffer containing the image data to be processed)
    Returns: A promise that resolves to the extracted text (string) from the image;
    throws an AppError if text extraction fails.
*/
const extractText = async (imageBuffer: Buffer): Promise<string> => {
  const [result] = await client.textDetection(imageBuffer);
  const detections = result?.fullTextAnnotation?.text;
  if (!detections) {
    throw new AppError(
      StatusMessages.FAILED_TO_EXTRACT_AADHAAR,
      StatusCodes.BAD_REQUEST
    );
  }
  return detections;
};

export { extractText };
