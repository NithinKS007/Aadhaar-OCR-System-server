import { client } from "../config/google.vision.config";

/*  
    Function: extractText
    Purpose: Extracts text from an image buffer using Google Vision API's text detection.
    Incoming: { imageBuffer: <Buffer> } (A Buffer containing the image data to be processed)
    Returns: A promise that resolves to the extracted text (string | null | undefined) from the image;
*/
const extractText = async (
  imageBuffer: Buffer
): Promise<string | null | undefined> => {
  const [result] = await client.textDetection(imageBuffer);
  const detections = result?.fullTextAnnotation?.text;
  return detections;
};

export { extractText };
