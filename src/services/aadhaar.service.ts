import { TYPES_SERVICES } from "@di/types-services";
import {
  IAadhaarService,
  IFileService,
  ITextExtractService,
} from "@interfaces/services/IServices";
import { inject, injectable } from "inversify";
import { AadhaarDetails } from "types/aadhaar";
import { AppError } from "@utils/app.error";
import { extractAadhaarInfo } from "@utils/extract.aadhaar";
import { StatusCodes } from "@utils/http.status.codes";
import { StatusMessages } from "@utils/http.status.messages";

/*  
    Module: Aadhaar Service
    Purpose: Extracts and validates Aadhaar details from the front and back image buffers.
    Description:
      - Uses `TextExtractService` to extract text from the images and checks for Aadhaar-specific keywords.
      - Validates and extracts details such as Aadhaar number, name, gender, date of birth, address, and pincode.
      - Throws an error if any required information is missing or invalid.
    Incoming:
      - `frontImageBuffer`: Image buffer for the front side of the Aadhaar card.
      - `backImageBuffer`: Image buffer for the back side of the Aadhaar card.
    Returns:
      - The extracted Aadhaar details (Aadhaar number, name, gender, dob, address, pincode).
      - Throws an error if validation fails or data is incomplete.
*/

@injectable()
export class AadhaarService implements IAadhaarService {
  private keywords = [
    "Government of India",
    "Unique Identification Authority of India",
    "भारत सरकार",
    "भारतीय विशिष्ट पहचान प्राधिकरण",
  ];

  constructor(
    @inject(TYPES_SERVICES.FileService) private fileService: IFileService,
    @inject(TYPES_SERVICES.TextExtractService)
    private textExtractService: ITextExtractService
  ) {}

  async extract({
    frontImageBuffer,
    backImageBuffer,
  }: {
    frontImageBuffer: Buffer;
    backImageBuffer: Buffer;
  }): Promise<AadhaarDetails> {
    const [frontSideText, backSideText] = await Promise.all([
      this.textExtractService.extract(frontImageBuffer),
      this.textExtractService.extract(backImageBuffer),
    ]);

    if (frontSideText == null) {
      throw new AppError(
        StatusMessages.INVALID_FRONT_IMAGE,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    if (backSideText == null) {
      throw new AppError(
        StatusMessages.INVALID_BACK_IMAGE,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const validateAadhaar = this.keywords.some((keyword) =>
      [frontSideText, backSideText].some((text) =>
        text.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (!validateAadhaar) {
      throw new AppError(
        StatusMessages.INVALID_AADHAAR,
        StatusCodes.BAD_REQUEST
      );
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
      throw new AppError(
        StatusMessages.INVALID_AADHAAR,
        StatusCodes.BAD_REQUEST
      );
    }

    return aadhaarDetails;
  }
}
