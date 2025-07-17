// CONTROLLERS
export { IControllers } from "@interfaces/controllers/IControllers";
export { AadhaarController } from "@controllers/Aadhaar.controller";

// SERVICES
export {
  IAadhaarService,
  IFileService,
  ITextExtractService,
} from "@interfaces/services/IServices";
export { TextExtractService } from "@services/text-extract.service";
export { FileService } from "@services/file.service";
export { AadhaarService } from "@services/aadhaar.service";

// CONTROLLER TYPES CONSTANTS
export { TYPES_CONTROLLERS } from "@di/types-controllers";

// SERVICE TYPES CONSTANTS
export { TYPES_SERVICES } from "@di/types-services";
