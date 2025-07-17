import { StatusCodes } from "@utils/http.status.codes";
import { StatusMessages } from "@utils/http.status.messages";
import { sendResponse } from "@utils/send.response";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/lib";

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      { errors: errors.array() },
      StatusMessages.ALL_FIELDS_ARE_REQUIRED
    );
    return;
  }
  next();
};
