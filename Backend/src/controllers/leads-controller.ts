import { Request, Response } from "express";
import { Lead, LeadModel } from "../models/leads.model";

export const getAllLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leads = await LeadModel.find().sort({ createdAt: -1 });

    if (!leads || leads.length === 0) {
      res.status(404).json({
        message: "No leads found.",
      });
      return;
    }
    res.status(200).json({ message: "Leads fetched successfully", leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
};

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leadData: Lead = req.body;
    if (!leadData || Object.keys(leadData).length === 0) {
      res.status(400).json({
        message: "Deal data is required.",
      });
      return;
    }

    const newLead = await LeadModel.create(leadData);
    res
      .status(201)
      .json({ message: "Lead created successfully", lead: newLead });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Failed to create lead", error });
  }
};

export const markLeadAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updatedLead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      message: "Lead marked as read",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error marking lead as read:", error);
    res.status(500).json({ message: "Failed to mark lead as read", error });
  }
};

export const updateLeadStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    if (!updatedLead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }

    res.status(200).json({
      message: "Lead status updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ message: "Failed to update lead status", error });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLead = await LeadModel.findByIdAndDelete(id);

    if (!deletedLead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      message: "Lead deleted successfully",
      lead: deletedLead,
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ message: "Failed to delete lead", error });
  }
};
