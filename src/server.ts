import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./routes/product-route.js";

// Razorpay makes a POST call to the callback URL with the razorpay_payment_id, razorpay_order_id and razorpay_signature in the response object of the successful payment. Only successful authorisations are auto-submitted.

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
