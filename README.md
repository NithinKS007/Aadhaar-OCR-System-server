# Aadhaar OCR System Backend Server

The Aadhaar OCR System Backend is a Node.js/Express-based backend service designed to handle the processing of Aadhaar card images. The system leverages Optical Character Recognition (OCR) to extract information from Aadhaar cards, including personal details such as the Aadhaar number, name, gender, date of birth, address, and pincode

This backend service provides an API for users to upload front and back images of their Aadhaar cards, performs OCR to extract the relevant data, validates the content, and returns the extracted details.

## 🚀 Features

- **Image Upload**: Accepts front and back images of Aadhaar cards via multipart form data.
- **OCR Extraction**: Uses Google Vision API for optical character recognition to extract text from the images.
- **Data Validation**: Verifies if the uploaded images are Aadhaar cards by checking for keywords like "Government of India", "Unique Identification Authority of India", "भारत सरकार", "भारतीय विशिष्ट पहचान प्राधिकरण",.
- **Aadhaar Card Details Extraction** : Extracts key Aadhaar card details such as name, Aadhaar number, date of birth, gender, and address
- **Error Handling**: Centralized error handling for API failures and incorrect routes.
- **Security Enhancements:

Rate Limiting: Protects against excessive requests by limiting the number of requests a client can make to the API within a specified time period (using express-rate-limit).

Logging: Request logging for debugging and monitoring using morgan.

Helmet: Adds security-related HTTP headers to prevent vulnerabilities like cross-site scripting (XSS), clickjacking, and more.

## 📋 Prerequisites

- Node.js (v12 or later)
- A Google Cloud account with access to the Vision API
- A `google-cloud-credentials.json` file for Vision API authentication
- Git

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Aadhaar-OCR-System-server.git
cd Aadhaar-OCR-System-server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Port on which the server will run
PORT=9000

# Allowed Origins for CORS (add your client app's URL here)
CLIENT_ORIGINS=http://localhost:3000

# Google Cloud credentials for Vision API (replace with your credentials)
GOOGLE_APPLICATION_CREDENTIALS_JSON='{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...Your private key here...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account-email@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your-client-cert-url"
}'

```

## 🏃‍♂️ Running the Server

Development mode:

```bash
npm run dev
```

The server will start on `http://localhost:9000` by default.

## 📁 Project Structure

```
server/
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore configuration
├── package-lock.json       # Package lock for npm
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
│
├── config/                 # Configuration files
│   ├── google.vision
│   │    .config            # Vision configuration
│
│
├── controllers/                    # Controllers for handling business logic
│   ├── aadhaar.controller.ts       # aadhaar controller
│
├── middleware/                     # Middleware for different processes
│   ├── error.middleware.ts         # Error handling middleware
│   ├── not.found.middleware.ts     # Not found middleware
│   └── ratelimit.middleware.ts     # Morgan logging middleware
│
│
├── routes/                         # API route definitions
│   ├── aadhaar.routes.ts           # Aadhaar routes
│
├── types/                          # TypeScript type definitions
│   ├── aadhaar.ts                  # Aadhaar types
│   └── files.ts                    # Incoming files types
│
├── utils/                          # Utility functions
│   ├── app.error.ts                # App-wide error handling
│   ├── extract.aadhaar.ts          # Extract aadhaar details from text utility functions
│   ├── google.vision.ts            # Google vision api integration to extract text from image utility
│   ├── http.status.codes.ts        # HTTP status codes
│   ├── http.status.messages.ts     # HTTP status messages
│   ├── multer.ts                   # Multer file upload utility
│   ├── send.response.ts            # Response sender utility
│
│
├── node_modules/           # Node.js dependencies (auto-generated)
│
├── dist/                   # Compiled JavaScript files (after TypeScript transpilation)
│
├── server.ts               # Main server file
└── index.ts                # Entry point to start the server

```

## 🔗 API Endpoints

## Aadhaar

POST /api/v1/aadhaar/extract
Content-Type: multipart/form-data

Request Body:
{

// frontSideImage: (File) A front-side image of the Aadhaar card (max 1 file)
// backSideImage: (File) A back-side image of the Aadhaar card (max 1 file)

}

Response:
{
// A response object containing the extracted data from the provided Aadhaar card images.
}

## 🔒 Security

- File uploads are restricted to "image/jpeg", "image/png", "image/webp", only
- Multer middleware for secure file handling
- Size limits on uploads
- Rate Limiting: This API uses express-rate-limit to limit the number of requests each user can make within a given time frame (default 100 requests per 15 minutes).
- Request Logging: All incoming requests are logged using Morgan, which provides useful information like HTTP method, URL, status code, and response time.
- Helmet: This API uses Helmet to secure HTTP headers, helping to prevent common vulnerabilities such as cross-site scripting (XSS), clickjacking, and others.

## ⚠️ Error Handling

The server includes centralized error handling middleware that catches and processes:

- File upload errors
- Image processing errors
- Validation errors

## 🛠 Development

### Adding New Features

1. Create necessary route in `routes/`
2. Implement controller logic in `controllers/`
3. Add any required middleware in `middlewares/`

### Code Style

- Use async/await for asynchronous operations
- Implement error handling middleware for all async operations
- Follow the existing project structure
- Use meaningful variable and function names

### 📦 Package Analysis

### Current Dependencies Analysis

### Required Packages (Keep)

```json
{
  "@google-cloud/vision": "^5.1.0", // Google Cloud Vision API for OCR functionality
  "@types/express": "^5.0.2", // Type definitions for Express.js
  "@types/node": "^22.15.18", // Type definitions for Node.js
  "cors": "^2.8.5", // Middleware for handling Cross-Origin Resource Sharing (CORS)
  "dotenv": "^16.5.0", // Loads environment variables from a .env file
  "express": "^5.1.0", // Web framework for building APIs
  "express-async-handler": "^1.2.0", // Middleware for handling asynchronous routes
  "multer": "^1.4.5-lts.2", // Middleware for handling file uploads
  "nodemon": "^3.1.10", // Development tool for auto-restarting the server during code changes
  "ts-node": "^10.9.2", // TypeScript execution engine for Node.js
  "typescript": "^5.8.3", // TypeScript compiler
  "express-rate-limit": "^5.0.0", // Rate limiting middleware
  "morgan": "^1.10.0", // Request logging middleware
  "helmet": "^5.0.0" // HTTP headers security middleware
}
```

### Development Dependencies (Keep)

```json
{
  "@types/cors": "^2.8.18", // Type definitions for CORS middleware
  "@types/dotenv": "^6.1.1", // Type definitions for dotenv
  "@types/multer": "^1.4.12", // Type definitions for multer
  "@types/morgan": "^1.9.2", // Type definitions for morgan logging middleware
  "@types/helmet": "^0.0.50", // Type definitions for helmet
  "@types/express-rate-limit": "^5.0.0" // Type definitions for express-rate-limit
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 🆘 Support

For support, please create an issue in the repository or contact the maintainers.
