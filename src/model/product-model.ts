import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);
