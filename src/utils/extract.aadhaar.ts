interface AadhaarDetails {
  aadhaarNumber: string;
  name: string;
  gender: string;
  dob: string;
  address: string;
  pincode: string;
}

const extractAddress = (backText: string): string => {
  const addressMatch = backText?.match(/(?<=Address:)([\s\S]*?\d{6})/);
  return addressMatch ? addressMatch[1].trim().replace(/\n/g, ',') : '';
};

const extractAadhaarNumber = (frontText: string): string => {
  const aadhaarNumberMatch = frontText?.match(/\d{4}\s\d{4}\s\d{4}/);
  return aadhaarNumberMatch ? aadhaarNumberMatch[0]?.replace(/\s/g, "") : '';
};

const extractName = (frontText: string): string => {
  const nameMatch = frontText.match(/(?<=Government of India\s*X\s*)([A-Za-z\s]+)(?=\sDOB)/);
  return nameMatch ? nameMatch[1].trim() : '';
};

const extractGender = (frontText: string): string => {
  const genderMatch = frontText.match(/पुरुष|Male|महिला|Female/);
  return genderMatch ? genderMatch[0] : '';
};

const extractDob = (frontText: string): string => {
  const dobMatch = frontText.match(/(\d{2}\/\d{2}\/\d{4})/);
  return dobMatch ? dobMatch[0] : '';
};

const extractPincode = (backText: string): string => {
  const pincodeMatch = backText.match(/\d{6}/);
  return pincodeMatch ? pincodeMatch[0] : '';
}

export const extractAadhaarInfo = (frontText: string, backText: string): AadhaarDetails => {
  const info: AadhaarDetails = {
    dob: extractDob(frontText),
    aadhaarNumber: extractAadhaarNumber(frontText),
    gender: extractGender(frontText),
    name: extractName(frontText),
    address: extractAddress(backText),
    pincode: extractPincode(backText),
  };
  console.log("info",info)
  return info;
};