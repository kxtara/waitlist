import app from "./app.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
dotenv.config()

app.use(errorHandler);
const PORT = process.env.PORT || env.PORT || 3000;
app.listen(PORT, () => {
  console.log("--- Debug Info ---");
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(
    `DATABASE_URL ends with: ${process.env.DATABASE_URL?.split("/").pop()}`,
  );
  console.log("------------------");
  console.log(`Server running on port ${PORT}`);
});
