import { Request, Response } from "express";
import { CategoryModel } from "../models/categories.model";

export const getCategoryBySlug = async (
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

    const category = await CategoryModel.findOne({ slug });

    if (!category) {
      res.status(404).json({
        message: "Category not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    res.status(500).json({
      message: "Failed to fetch category.",
      error,
    });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryData = req.body;
    if (!categoryData || Object.keys(categoryData).length === 0) {
      res.status(400).json({
        message: "Category data is required.",
      });
      return;
    }

    const newCategory = await CategoryModel.create(categoryData);
    res.status(201).json({
      message: "Category created successfully.",
      newCategory,
    });
    return;
  } catch (error) {
    console.error("Error creating category: ", error);
    res.status(500).json({ message: "Failed to create category", error });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug, ...rest } = req.body;

    if (!slug || Object.keys(rest).length === 0) {
      res.status(400).json({
        message: "Slug and category data are required.",
      });
      return;
    }

    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { slug },
      rest,
      { new: true, overwrite: true }
    );

    if (!updatedCategory) {
      res.status(404).json({
        message: "Category not found.",
      });
      return;
    }
    res.status(200).json({
      message: "Category updated successfully.",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "Failed to update category.",
      error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        message: "Slug parameter is required.",
      });
      return;
    }

    const deletedCategory = await CategoryModel.findOneAndDelete({ slug });
    if (!deletedCategory) {
      res.status(404).json({
        message: "Category not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully.",
      deleteCategory,
    });
    return;
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      message: "Failed to delete category.",
      error,
    });
  }
};
