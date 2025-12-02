import express from "express";
import Offering from "../models/Offering.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------- SAMPLE DATA (6 CARDS) ---------------- */
const sampleOfferings = [
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  },
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  },
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  },
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  },
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  },
  {
    tag: "House",
    imageUrl: "",
    title: "Oxalis",
    location: "Brooklyn, NY",
    description:
      "A recognized leader in language immersion & early education, opening second school.",
    totalPrice: 1000000,
    getPrice: 57990,
    securityType: "Revenue Sharing Note",
    investmentMultiple: "1.4x",
    maturity: "48 Months",
    minInvestment: 100
  }
];

/* ------------- SEED ROUTE (NOW GET, WORKS IN BROWSER) ------------- */
router.get("/seed", async (req, res) => {
  try {
    // optional: clear existing docs so you don't duplicate
    await Offering.deleteMany({});
    await Offering.insertMany(sampleOfferings);
    res.json({ message: "Sample offerings inserted" });
  } catch (err) {
    console.error("SEED ERROR:", err);
    res.status(500).json({ message: "Seed failed" });
  }
});

/* ----------------- PUBLIC: GET ALL OFFERINGS ----------------- */
router.get("/", async (req, res) => {
  try {
    const offerings = await Offering.find().sort({ createdAt: -1 });
    res.json(offerings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ----------------- ADMIN: CREATE ----------------- */
router.post("/", protect, async (req, res) => {
  try {
    const offering = await Offering.create(req.body);
    res.status(201).json(offering);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ----------------- ADMIN: UPDATE ----------------- */
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Offering.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ----------------- ADMIN: DELETE ----------------- */
router.delete("/:id", protect, async (req, res) => {
  try {
    await Offering.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
