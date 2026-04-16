import { Request, Response } from "express";
import { TestimonialModel } from "../models/testimonials.model";

export const getTestimonials = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Testimonials fetched successfully",
      testimonials,
    });
  } catch (error) {
    console.error("Error getting testimonials:", error);
    res.status(500).json({
      message: "Failed to get testimonials",
      error,
    });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    let { link } = req.body;

    if (!link) {
      res.status(400).json({
        message: "YouTube Shorts link is required.",
      });
      return;
    }

    const match = link.match(/youtube\.com\/shorts\/([^?]+)/);

    if (!match) {
      res.status(400).json({
        message: "Invalid YouTube Shorts link.",
      });
      return;
    }

    const videoId = match[1];

    // ✅ Convert to embed URL
    const embedLink = `https://www.youtube.com/embed/${videoId}`;

    // ✅ Save only embed link
    const newTestimonial = await TestimonialModel.create({
      link: embedLink,
    });

    res.status(201).json({
      message: "Testimonial created successfully.",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      message: "Failed to create testimonial.",
      error,
    });
  }
};
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await TestimonialModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Testimonial not found" });
      return;
    }

    res.status(200).json({
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({
      message: "Failed to delete testimonial",
      error,
    });
  }
};