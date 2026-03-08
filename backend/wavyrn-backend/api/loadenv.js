import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load parent dir first (backend/wavyrn-backend/.env), then api/.env so both work
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, ".env") });
