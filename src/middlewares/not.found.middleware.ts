import { StatusCodes } from "@utils/http.status.codes";
import { StatusMessages } from "@utils/http.status.messages";
import { sendResponse } from "@utils/send.response";
import { Request, Response } from "express";

/*  
    Middleware: notFoundMiddleware
    Purpose: Catches all unmatched routes and sends a "Not Found" response.
    Incoming: Request (req), Response (res)
    Returns: Sends a 404 error response with a custom message.
*/

export const notFoundMiddleware = (req: Request, res: Response): void => {
  sendResponse(res, StatusCodes.NOT_FOUND, null, StatusMessages.NOT_FOUND);
};
