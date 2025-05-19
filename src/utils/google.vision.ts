import { client } from "../config/google.vision.config";
import { AppError } from "./app.error";
import { StatusCodes } from "./http.status.codes";
import { StatusMessages } from "./http.status.messages";

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
