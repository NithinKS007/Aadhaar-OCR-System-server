import multer from "multer";
import { Request } from "express";
import { AppError } from "./app.error";
import { StatusCodes } from "./http.status.codes";
import { StatusMessages } from "./http.status.messages";

/*  
    Function: fileFilter
    Purpose: Filters the uploaded files to allow only image files (JPEG, PNG, WebP) with a maximum size of 5MB.
    Incoming: { req: Request, file: Express.Multer.File, cb: Function }
    - req: The incoming request object.
    - file: The file object uploaded by the user.
    - cb: The callback function to be called with the result.
    Returns: A promise that resolves to `true` if the file is an image, and `false` if it's not.
    Throws: An error if validation fails (non-image file).
*/
const fileFilter = async (
  req: Request,
  file: Express.Multer.File,
  cb: Function
): Promise<void> => {
  try {
    const isImage = await validateImage(file);
    if (!isImage) {
      return cb(
        new AppError(
          StatusMessages.IMAGES_ARE_ONLY_ALLOWED,
          StatusCodes.BAD_REQUEST
        ),
        false
      );
    }
    cb(null, true);
  } catch (error) {
    cb(error, false);
  }
};

/*  
    Function: validateImage
    Purpose: Validates if the uploaded file is an image by checking its mimetype.
    Incoming: { file: Express.Multer.File }
    - file: The file object uploaded by the user.
    Returns: A boolean value wrapped in a promise.
    - true if the file is an image.
    - false if the file is not an image.
*/
const validateImage = async (file: Express.Multer.File): Promise<boolean> => {
  const allowedMimes = [
    "image/jpeg", 
    "image/png", 
    "image/webp", 
  ];

  return allowedMimes.includes(file.mimetype);
};

/*  
    Function: handle images using multer
    Purpose: Configures the multer middleware to handle image file uploads with memory storage, 
    file filters, and file size limits.
    Incoming: None
    Returns: A multer instance configured with storage, file filter, and file size limits.
    - File size limit is set to 5MB.
*/
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
