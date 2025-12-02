import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema(
  {
    tag: String,
    imageUrl: String,
    title: String,
    location: String,
    description: String,
    totalPrice: Number,
    getPrice: Number,
    securityType: String,
    investmentMultiple: String,
    maturity: String,
    minInvestment: Number
  },
  { timestamps: true }
);

const Offering = mongoose.model("Offering", offeringSchema);


// hhhhww
export default Offering;
