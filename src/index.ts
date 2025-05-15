import dotenv from "dotenv";
import app from "./server";

const PORT = process.env.PORT;

dotenv.config();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
