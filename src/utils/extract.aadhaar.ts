import { AadhaarDetails } from "../types/aadhaar";
/*  
    Function: extractAddress
    Purpose: Extracts the address from the back side text using a regular expression.
    Incoming: { backText: <string> } (text from the back side of the Aadhaar card containing the address)
    Returns: The extracted address as a string; returns an empty string if address not found.
*/

const extractAddress = (backText: string): string => {
  const addressMatch = backText?.match(/(?<=Address:)([\s\S]*?\d{6})/);
  return addressMatch ? addressMatch[1].trim().replace(/\n/g, "") : "";
};

/*  
    Function: extractAadhaarNumber
    Purpose: Extracts the Aadhaar number from the front side text using a regular expression.
    Incoming: { frontText: <string> } (text from the front side of the Aadhaar card containing the Aadhaar number)
    Returns: The extracted Aadhaar number as a string without spaces; returns an empty string if not found.
*/

const extractAadhaarNumber = (frontText: string): string => {
  const aadhaarNumberMatch = frontText?.match(/\d{4}\s\d{4}\s\d{4}/);
  return aadhaarNumberMatch ? aadhaarNumberMatch[0]?.replace(/\s/g, "") : "";
};

/*  
    Function: extractName
    Purpose: Extracts the name from the front side text using a regular expression.
    Incoming: { frontText: <string> } (text from the front side of the Aadhaar card containing the name)
    Returns: The extracted name as a string; returns an empty string if name not found.
*/

const extractName = (frontText: string): string => {
  const nameMatch = frontText.match(
    /(?<=Government of India\s*X\s*)([A-Za-z\s]+)(?=\sDOB)/
  );
  return nameMatch ? nameMatch[1].trim() : "";
};

/*  
    Function: extractGender
    Purpose: Extracts the gender from the front side text using a regular expression.
    Incoming: { frontText: <string> } (text from the front side of the Aadhaar card containing gender information)
    Returns: The extracted gender as a string; returns an empty string if gender not found.
*/

const extractGender = (frontText: string): string => {
  const genderMatch = frontText.match(/पुरुष|Male|महिला|Female/);
  return genderMatch ? genderMatch[0] : "";
};

/*  
    Function: extractDob
    Purpose: Extracts the date of birth from the front side text using a regular expression.
    Incoming: { frontText: <string> } (text from the front side of the Aadhaar card containing the date of birth)
    Returns: The extracted date of birth in DD/MM/YYYY format; returns an empty string if not found.
*/

const extractDob = (frontText: string): string => {
  console.log("text", frontText);
  const dobMatch = frontText.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/);
  return dobMatch ? dobMatch[1] : "";
};

/*  
    Function: extractPincode
    Purpose: Extracts the pincode from the back side text using a regular expression.
    Incoming: { backText: <string> } (text from the back side of the Aadhaar card containing the pincode)
    Returns: The extracted pincode as a string; returns an empty string if pincode not found.
*/

const extractPincode = (backText: string): string => {
  const pincodeMatch = backText.match(/\d{6}/);
  return pincodeMatch ? pincodeMatch[0] : "";
};

/*  
    Function: extractAadhaarInfo
    Purpose: Extracts all the relevant information from both the front and back side text of the Aadhaar card.
    Incoming: 
      { frontText: <string> } (text from the front side of the Aadhaar card )
      { backText: <string> } (text from the back side of the Aadhaar card )
    Returns: An object containing the extracted Aadhaar details: { aadhaarNumber, name, gender, dob, address, pincode }
*/

export const extractAadhaarInfo = (
  frontText: string,
  backText: string
): AadhaarDetails => {
  const info: AadhaarDetails = {
    dob: extractDob(frontText),
    aadhaarNumber: extractAadhaarNumber(frontText),
    gender: extractGender(frontText),
    name: extractName(frontText),
    address: extractAddress(backText),
    pincode: extractPincode(backText),
  };
  console.log("info", info);
  return info;
};
