import { AppError } from "@utils/app.error";
import { StatusCodes } from "@utils/http.status.codes";
import { StatusMessages } from "@utils/http.status.messages";
import { body } from "express-validator";

export const validateAadhaarSchema = [
  body("frontSideImage").custom((value, { req }) => {
    if (!req.files || !req.files["frontSideImage"]) {
      throw new AppError(
        StatusMessages.FRONT_SIDE_IMAGE_REQUIRED,
        StatusCodes.BAD_REQUEST
      );
    }
    const file = req.files["frontSideImage"][0];

    if (!Buffer.isBuffer(file.buffer)) {
      throw new AppError(
        "Front side image must be a valid buffer",
        StatusCodes.BAD_REQUEST
      );
    }
    return true;
  }),

  body("backSideImage").custom((value, { req }) => {
    if (!req.files || !req.files["backSideImage"]) {
      throw new AppError(
        StatusMessages.Back_SIDE_IMAGE_REQUIRED,
        StatusCodes.BAD_REQUEST
      );
    }
    const file = req.files["backSideImage"][0];
    if (!Buffer.isBuffer(file.buffer)) {
      throw new AppError(
        "Back side image must be a valid buffer",
        StatusCodes.BAD_REQUEST
      );
    }
    return true;
  }),
];
