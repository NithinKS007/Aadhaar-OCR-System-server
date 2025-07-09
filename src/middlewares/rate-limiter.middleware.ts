import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { StatusMessages } from "../utils/http.status.messages";
import { StatusCodes } from "../utils/http.status.codes";
import { sendResponse } from "../utils/send.response";

const handleRateLimitExceeded = (req: Request, res: Response) => {
  sendResponse(
    res,
    StatusCodes.RATE_LIMIT,
    null,
    StatusMessages.TOO_MANY_REQUESTS
  );
};

const createRateLimiter = (windowMs: number, maxRequests: number) =>
  rateLimit({
    windowMs,
    max: maxRequests,
    message: StatusMessages.TOO_MANY_REQUESTS,
    statusCode: StatusCodes.RATE_LIMIT,
    handler: handleRateLimitExceeded,
  });

const rateLimiter = createRateLimiter(1 * 60 * 1000, 150);

export default rateLimiter;
