import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import offeringRoutes from "./routes/offeringRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                  // local dev
  "https://flipr-assignment-io.netlify.app" // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/auth", authRoutes);
app.use("/api/offerings", offeringRoutes);
app.use("/api/newsletter", newsletterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
