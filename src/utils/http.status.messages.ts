export enum StatusMessages {
  INTERNAL_SERVER_ERROR = "Internal server error. Please try again later.",
  EXTRACTION_SUCCESS = "Aadhaar details extracted successfully",
  FAILED_TO_EXTRACT_AADHAAR = "Failed to extract Aadhaar data",
  IMAGES_ARE_ONLY_ALLOWED = "Images are only allowed",
  ALL_FIELDS_ARE_REQUIRED = "All fields are required",
  INVALID_AADHAAR = "Please upload the front and back images of the Aadhaar card in the correct positions",
  NOT_FOUND = "Resource not found",
  INVALID_FRONT_IMAGE = "The uploaded image does not appear to be a valid Aadhaar card front image. Please upload a valid front image of the Aadhaar card.",
  INVALID_BACK_IMAGE = "The uploaded image does not appear to be a valid Aadhaar card back image. Please upload a valid back image of the Aadhaar card",
}
