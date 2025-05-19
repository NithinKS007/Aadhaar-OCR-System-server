import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { aadhaar } from "./routes/aadhaar.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CLIENT_ORIGINS;

/*  
   Set up CORS to allow requests from specific origins, with support for credentials (cookies)
   - origin: Specifies which client origins are allowed to make requests.
   - methods: Restrict allowed HTTP methods (only GET and POST are allowed here).
   - credentials: Allows the server to accept cookies sent by the client.
*/
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET","POST"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// Routes for aadhaar
app.use("/api/v1/aadhaar", aadhaar);
// Error-handling middleware.
app.use(errorMiddleware);

export default app;
