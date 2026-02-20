import { Request, Response } from "express";
import { DealModel, Deal } from "../models/deals.model";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";
import axios from "axios";
import { isDealApplicable } from "../utils/couponCode";

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
    res.status(500).json({ message: "Something went wrong while fetching the deals. Please try again later.", error });
  }
};

export const validateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { couponCode, productId, email } = req.body;

    if (!couponCode || !productId || !email) {
      res.status(400).json({ message: "Missing fields of coupon code, product ID, or email." });
      return;
    }
    
    const { valid, message, discount } = await isDealApplicable(
      couponCode,
      productId,
      email
    );

    res.status(200).json({ valid, message, discount });
  } catch (error) {
    console.error("Error validating coupon:", error);
    res.status(500).json({ message: "Something went wrong while validating the coupon. Please try again later." });
  }
};

export const createDeal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealData = req.body as Partial<Deal>;

    if (!dealData || Object.keys(dealData).length === 0) {
      res.status(400).json({
        message: "Deal data is required.",
      });
      return;
    }

    let imageUrl: string | undefined;

    if (req.file) {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "deals",
              transformation: [{
                fetch_format: "auto", 
                quality: "auto"
              }],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result as UploadApiResponse);
            }
          );
          stream.end(req.file?.buffer);
        }
      );
      imageUrl = uploadResult.secure_url;
    } else if (dealData.imageUrl) {
      const imageResponse = await axios.get(dealData.imageUrl, {
        responseType: "arraybuffer",
      });

      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "deals",
              transformation: [{
                fetch_format: "auto", 
                quality: "auto"
              }],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result as UploadApiResponse);
            }
          );
          stream.end(Buffer.from(imageResponse.data, "binary"));
        }
      );
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      res.status(400).json({ message: "Image (file or URL) is required." });
      return;
    }

    const newDeal = await DealModel.create({ ...dealData, imageUrl });
    res
      .status(201)
      .json({ message: "Deal created successfully", deal: newDeal });
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ message: "Something went wrong while creating the deal. Please try again later.", error });
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
    res.status(500).json({ message: "Something went wrong while updating the deal. Please try again later.", error });
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
    res.status(200).json({ message: "Deal deleted successfully", deletedDeal });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: "Something went wrong while deleting the deal. Please try again later.", error });
  }
}; 