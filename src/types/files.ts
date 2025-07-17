import { Request } from "express";
/*  
    Interface: FileRequest
    Purpose: Extends the Express Request object to include a custom `files` property for handling uploaded files 
    (front and back side images).
    Incoming: 
      { frontSideImage: <Express.Multer.File[]> } (Array of files uploaded for the front side of the aadhaar)
      { backSideImage: <Express.Multer.File[]> } (Array of files uploaded for the back side of the aadhaar)
    Returns: An object extending the Request interface, with an additional `files` property containing the uploaded images.
*/
interface FileRequest extends Request {
  files?: {
    frontSideImage?: Express.Multer.File[];
    backSideImage?: Express.Multer.File[];
  };
}

export default FileRequest;
