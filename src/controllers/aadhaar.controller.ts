import { FileRequest } from "../types/images";
import { Response } from "express";
import { AppError } from "../utils/app.error";
import { StatusCodes } from "../utils/http.status.codes";
import { StatusMessages } from "../utils/http.status.messages";
import { extractText } from "../utils/google.vision";
import { extractAadhaarInfo } from "../utils/extract.aadhaar";
import { sendResponse } from "../utils/send.response";

const keywords = [
  "Government of India",
  "Unique Identification Authority of India",
  "भारत सरकार",
  "भारतीय विशिष्ट पहचान प्राधिकरण",
];
/*  
    Route: POST api/v1/aadhaar/extract
    Purpose: Extract Aadhaar details from uploaded front and back images of the Aadhaar card.
    Incoming: { frontImage: File, backImage: File } (body)
    - frontImage: The front image of the Aadhaar card (uploaded by the user).
    - backImage: The back image of the Aadhaar card (uploaded by the user).
    Returns: 
    - { aadhaarDetails: Object, message: string }
    - aadhaarDetails: The extracted Aadhaar details.
    - message: A success message indicating that the extraction was successful.
*/

const extractAadhaarData = async (
  req: FileRequest,
  res: Response
): Promise<void> => {
  if (!req?.files["frontSideImage"] || !req.files["backSideImage"]) {
    throw new AppError(
      StatusMessages.ALL_FIELDS_ARE_REQUIRED,
      StatusCodes.BAD_REQUEST
    );
  }

  const frontImageBuffer = req.files["frontSideImage"][0].buffer;
  const backImageBuffer = req.files["backSideImage"][0].buffer;

  const [frontSideText, backSideText] = await Promise.all([
    extractText(frontImageBuffer),
    extractText(backImageBuffer),
  ]);

  const validateAadhaar = keywords.some((keyword) =>
    [...frontSideText, ...backSideText].map((text) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (!validateAadhaar) {
    throw new AppError(StatusMessages.INVALID_AADHAAR, StatusCodes.BAD_REQUEST);
  }
  const { aadhaarNumber, name, gender, dob, address, pincode } =
    extractAadhaarInfo(frontSideText, backSideText);

  const aadhaarDetails = {
    aadhaarNumber,
    name,
    gender,
    dob,
    address,
    pincode,
  };

  if (
    !aadhaarDetails.aadhaarNumber ||
    !aadhaarDetails.name ||
    !aadhaarDetails.gender ||
    !aadhaarDetails.dob ||
    !aadhaarDetails.address ||
    !aadhaarDetails.pincode
  ) {
    throw new AppError(StatusMessages.INVALID_AADHAAR, StatusCodes.BAD_REQUEST);
  }

  sendResponse(
    res,
    StatusCodes.OK,
    { aadhaarDetails },
    StatusMessages.EXTRACTION_SUCCESS
  );
};

export { extractAadhaarData };
