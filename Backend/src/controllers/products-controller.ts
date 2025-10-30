import { Request, Response } from "express";
import { Product, ProductModel } from "../models/products.model";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";
import { Category, CategoryModel } from "../models/categories.model";
import axios from "axios";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productData: Product = {
      ...req.body,
      price: Number(req.body.price),
      rating: Number(req.body.rating),
      features: JSON.parse(req.body.features || "[]"),
      packaging: JSON.parse(req.body.packaging || "{}"),
    };
    if (!productData || Object.keys(productData).length === 0) {
      res.status(400).json({
        message: "Product data is required.",
      });
      return;
    }

    const categoryData: Category | null = await CategoryModel.findById(
      productData.categoryId
    );
    if (!categoryData || Object.keys(categoryData).length === 0) {
      res.status(400).json({
        message: "Category Id is not valid.",
      });
      return;
    }

    const uploadedImages: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uploadResult: UploadApiResponse = await new Promise(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: `category/${categoryData.name}/${productData.name}`,
                transformation: [
                  {
                    fetch_format: "auto",
                    quality: "auto",
                  },
                ],
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result as UploadApiResponse);
              }
            );
            stream.end(file.buffer);
          }
        );

        uploadedImages.push(uploadResult.secure_url);
      }
    }

    productData.images = uploadedImages;
    const newProduct = await ProductModel.create(productData);

    await axios.get(`${process.env.FRONTEND_URL}/api/revalidate`, {
      params: {
        path: `/${categoryData.slug}`,
        secret: process.env.REVALIDATE_SECRET,
      },
    });
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

    const populatedProduct = await updatedProduct.populate<{
      categoryId: Category;
    }>("categoryId");

    await axios.get(`${process.env.FRONTEND_URL}/api/revalidate`, {
      params: {
        path: `/${populatedProduct.categoryId.slug}`,
        secret: process.env.REVALIDATE_SECRET,
      },
    });

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

    const populatedProduct = await deletedProduct.populate<{
      categoryId: Category;
    }>("categoryId");

    await axios.get(`${process.env.FRONTEND_URL}/api/revalidate`, {
      params: {
        path: `/${populatedProduct.categoryId.slug}`,
        secret: process.env.REVALIDATE_SECRET,
      },
    });

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

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProducts = await ProductModel.find();

    if (!allProducts || allProducts.length === 0) {
      res.status(404).json({
        message: "No products found.",
      });
      return;
    }

    res.status(200).json({
      message: "Products fetched successfully.",
      products: allProducts,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({
      message: "Failed to fetch products.",
      error,
    });
  }
};

export const getProductByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      res.status(400).json({
        message: "Category Id is required.",
      });
      return;
    }

    const products = await ProductModel.find({ categoryId: categoryId });

    if (!products || products.length === 0) {
      res.status(404).json({
        message: "No products found for this category.",
      });
      return;
    }

    res.status(200).json({
      message: "Products fetched successfully.",
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      message: "Failed to fetch products.",
      error,
    });
  }
};
