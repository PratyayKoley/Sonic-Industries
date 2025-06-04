import { Request, Response } from "express";
import { Product, ProductModel } from "../models/products.model";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productData: Product = req.body;
    if (!productData || Object.keys(productData).length === 0) {
      res.status(400).json({
        message: "Product data is required.",
      });
      return;
    }

    const newProduct = await ProductModel.create(productData);
    res.status(201).json({
      message: "Product created successfully.",
      newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product.",
      error,
    });
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        message: "Slug parameter is required.",
      });
      return;
    }

    const product = await ProductModel.findOne({ slug });

    if (!product) {
      res.status(404).json({
        message: "Product not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({
      message: "Failed to fetch product.",
      error,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug, ...rest } = req.body;

    if (!slug || Object.keys(rest).length === 0) {
      res.status(400).json({
        message: "Slug and product data are required.",
      });
      return;
    }

    const updatedProduct = await ProductModel.findOneAndUpdate({ slug }, rest, {
      new: true,
      overwrite: true,
    });

    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found.",
      });
      return;
    }
    res.status(200).json({
      message: "Product updated successfully.",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product.",
      error,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        message: "Slug parameter is required.",
      });
      return;
    }

    const deletedProduct = await ProductModel.findOneAndDelete({ slug });

    if (!deletedProduct) {
      res.status(404).json({
        message: "Product not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      deletedProduct,
    });
    return;
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product.",
      error,
    });
  }
};