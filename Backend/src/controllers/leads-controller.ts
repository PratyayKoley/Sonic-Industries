import { Request, Response } from "express";
import { Lead, LeadModel } from "../models/leads.model";

export const getAllLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leads = await LeadModel.find();

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

