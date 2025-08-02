import { Request, Response } from "express";
import { DealModel, Deal } from "../models/deals.model";

export const getAllDeals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deals = await DealModel.find();

    if (!deals || deals.length === 0) {
      res.status(404).json({
        message: "No deals found.",
      });
      return;
    }
    res.status(200).json({ message: "Deals fetched successfully", deals });
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: "Failed to fetch deals", error });
  }
};

export const getDealById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "ID parameter is required.",
      });
      return;
    }

    const deal = await DealModel.findById(id);
    if (!deal) {
      res.status(404).json({ message: "Deal not found" });
      return;
    }
    res.status(200).json({ message: "Deal fetched successfully", deal });
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ message: "Failed to fetch deal", error });
  }
};

export const createDeal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealData: Deal = req.body;
    if (!dealData || Object.keys(dealData).length === 0) {
      res.status(400).json({
        message: "Deal data is required.",
      });
      return;
    }

    const newDeal = await DealModel.create(dealData);
    res.status(201).json({ message: "Deal created successfully", deal: newDeal });
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ message: "Failed to create deal", error });
  }
};

export const updateDeal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "ID parameter is required.",
      });
      return;
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "Deal data is required for update.",
      });
      return;
    }

    const updatedDeal = await DealModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDeal) {
      res.status(404).json({ message: "Deal not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Deal updated successfully", deal: updatedDeal });
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ message: "Failed to update deal", error });
  }
};

export const deleteDeal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "ID parameter is required.",
      });
      return;
    }

    const deletedDeal = await DealModel.findByIdAndDelete(id);
    if (!deletedDeal) {
      res.status(404).json({ message: "Deal not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Deal deleted successfully", deletedDeal });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: "Failed to delete deal", error });
  }
};
