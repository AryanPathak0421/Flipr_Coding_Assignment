import express from "express";
import Newsletter from "../models/Newsletter.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// public: subscribe
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const sub = await Newsletter.create({ email });
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// admin: get all
router.get("/", protect, async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
