import { container } from "@di/container";
import { IControllers, IFileService, TYPES_CONTROLLERS, TYPES_SERVICES } from "@di/file-imports-index";

export const aadhaarController = container.get<IControllers>(TYPES_CONTROLLERS.AadhaarController)
export const fileService = container.get<IFileService>(TYPES_SERVICES.FileService)