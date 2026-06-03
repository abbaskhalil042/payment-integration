import express from "express";
import type { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  rateProduct,
  updateProduct,
} from "../controllers/product-controller.js";
import { Product } from "../model/product-model.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/rate", rateProduct);
router.post("/bulk", async (req: Request, res: Response) => {
  // await Product.collection.drop();
  const bulkProducts = await Product.insertMany(req.body);

  res.status(201).json(bulkProducts);
});

export default router;
