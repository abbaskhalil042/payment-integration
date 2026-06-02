import type { Request, Response } from "express";
import { Product } from "../model/product-model.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      description,
      price,
      currency,
      sku,
      stock,
      images,
      category,
    } = req.body;

    const product = await Product.create({
      title,
      slug,
      description,
      price,
      currency,
      sku,
      stock,
      images,
      category,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ stock: { $gte: 10 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { ratingCount, averageRating, ...updates } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const rateProduct = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const count = product.ratingCount ?? 0;
    const avg = product.averageRating ?? 0;
    const newCount = count + 1;
    const newAvg = (avg * count + rating) / newCount;

    product.ratingCount = newCount;
    product.averageRating = newAvg;
    await product.save();

    // Alternative style using mongoose's .get() / .set() methods:
    // const count = product.get("ratingCount") ?? 0;
    // const avg = product.get("averageRating") ?? 0;
    // const newCount = count + 1;
    // const newAvg = (avg * count + rating) / newCount;
    // product.set("ratingCount", newCount);
    // product.set("averageRating", newAvg);
    // await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
