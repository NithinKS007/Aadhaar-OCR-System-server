import { Container } from "inversify";
import {
  AadhaarController,
  AadhaarService,
  FileService,
  IAadhaarService,
  IControllers,
  IFileService,
  ILoggerService,
  ITextExtractService,
  LoggerService,
  TextExtractService,
  TYPES_CONTROLLERS,
  TYPES_SERVICES,
} from "@di/file-imports-index";

export const container = new Container();

container.bind<IControllers>(TYPES_CONTROLLERS.AadhaarController).to(AadhaarController)
container.bind<ITextExtractService>(TYPES_SERVICES.TextExtractService).to(TextExtractService)
container.bind<IFileService>(TYPES_SERVICES.FileService).to(FileService)
container.bind<IAadhaarService>(TYPES_SERVICES.AadhaarService).to(AadhaarService)
container.bind<ILoggerService>(TYPES_SERVICES.LoggerService).to(LoggerService)