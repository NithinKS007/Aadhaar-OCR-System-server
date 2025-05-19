export interface FileRequest extends Request {
  files: {
    frontSideImage: Express.Multer.File[];
    backSideImage: Express.Multer.File[];
  };
}