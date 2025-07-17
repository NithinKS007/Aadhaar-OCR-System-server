import { Handler } from "express";
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

export interface ILoggerService {
  log(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string): void;
  debug(message: string): void;
  verbose(message: string): void;
  streamLog(): Handler;
}
