import { Multer } from "multer";
import { AadhaarDetails } from "types/aadhaar";

export interface ITextExtractService {
  extract(imageBuffer: Buffer): Promise<string | null | undefined>;
}
export interface IFileService {
  configureUpload(): Multer;
}

export interface IAadhaarService {
  extract({
    frontImageBuffer,
    backImageBuffer,
  }: {
    frontImageBuffer: Buffer;
    backImageBuffer: Buffer;
  }): Promise<AadhaarDetails>;
}
