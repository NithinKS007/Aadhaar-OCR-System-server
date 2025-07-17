import { IAadhaarService } from "@di/file-imports-index";
import { TYPES_SERVICES } from "@di/types-services";
import { Response } from "express";
import { IControllers } from "@interfaces/controllers/IControllers";
import { inject, injectable } from "inversify";
import FileRequest from "types/files";
import { AppError } from "@utils/app.error";
import { StatusCodes } from "@utils/http.status.codes";
import { StatusMessages } from "@utils/http.status.messages";
import { sendResponse } from "@utils/send.response";

/*  
    Module: Aadhaar Controller
    Purpose: Handles Aadhaar extraction from uploaded front and back images.
    Description:
      - Validates the request for required images and extracts Aadhaar details via `AadhaarService`.
    Incoming:
      - `frontSideImage` and `backSideImage`: Uploaded Aadhaar card images.
    Returns:
      - Extracted Aadhaar details or an error if the validation fails.
*/

@injectable()
export class AadhaarController implements IControllers {
  constructor(
    @inject(TYPES_SERVICES.AadhaarService)
    private AadhaarService: IAadhaarService
  ) {}
  async handle(req: FileRequest, res: Response): Promise<void> {
    if (
      !req?.files ||
      !req?.files["frontSideImage"] ||
      !req.files["backSideImage"]
    ) {
      throw new AppError(
        StatusMessages.ALL_FIELDS_ARE_REQUIRED,
        StatusCodes.BAD_REQUEST
      );
    }

    const frontImageBuffer = req.files["frontSideImage"][0].buffer;
    const backImageBuffer = req.files["backSideImage"][0].buffer;

    const extractDetails = await this.AadhaarService.extract({
      frontImageBuffer,
      backImageBuffer,
    });

    sendResponse(
      res,
      StatusCodes.OK,
      { ...extractDetails },
      StatusMessages.EXTRACTION_SUCCESS
    );
  }
}
