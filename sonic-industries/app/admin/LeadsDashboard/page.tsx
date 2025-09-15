"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Mail,
  Search,
  Archive,
  Trash2,
  User,
  AtSign,
  Clock,
} from "lucide-react";
import { LeadBackend } from "@/types";
import OpenMail from "./OpenMail";

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<LeadBackend[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadBackend | null>(null);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 15;

  useEffect(() => {
    loadAllLeads();
  }, []);

  const loadAllLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLeads(response.data.leads || []);
    } catch {
      setError(
        "Failed to load leads. Make sure you have a GET /api/leads endpoint."
      );
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (leadId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads/${leadId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLeads(
        leads.map((lead) =>
          lead._id === leadId ? { ...lead, isRead: true } : lead
        )
      );
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to mark as read");
    }
  };

  const updateStatus = async (leadId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads/${leadId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLeads(
        leads.map((lead) =>
          lead._id === leadId
            ? { ...lead, status: status as LeadBackend["status"] }
            : lead
        )
      );

      // Update selected lead if it's the one being updated
      if (selectedLead?._id === leadId) {
        setSelectedLead({
          ...selectedLead,
          status: status as LeadBackend["status"],
        });
      }

      setSuccess("Status updated successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteLead = async (leadId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this lead? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads/${leadId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLeads(leads.filter((lead) => lead._id !== leadId));
      setSuccess("Lead deleted successfully!");

      // Close modal if the deleted lead was selected
      if (selectedLead?._id === leadId) {
        setSelectedLead(null);
        setIsMailModalOpen(false);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to delete lead");
    }
  };

  const handleLeadClick = (lead: LeadBackend) => {
    setSelectedLead(lead);
    setIsMailModalOpen(true);
    if (!lead.isRead) {
      markAsRead(lead._id);
    }
  };

  const handleCloseModal = () => {
    setIsMailModalOpen(false);
    setSelectedLead(null);
  };

  const toggleSelectLead = (leadId: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const selectAllLeads = () => {
    const filteredLeadIds = filteredLeads.map((lead) => lead._id);
    setSelectedLeads(
      selectedLeads.length === filteredLeadIds.length ? [] : filteredLeadIds
    );
  };

  // Filter and search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.senderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Leads Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer inquiries and messages
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadAllLeads}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">{success}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Lead List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* List Header */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <input
              type="checkbox"
              checked={
                selectedLeads.length === filteredLeads.length &&
                filteredLeads.length > 0
              }
              onChange={selectAllLeads}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {filteredLeads.length} of {leads.length} leads
            </span>
            {selectedLeads.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">
                  {selectedLeads.length} selected
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Archive className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Lead Items */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-gray-600">Loading leads...</p>
              </div>
            ) : paginatedLeads.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No leads found</p>
              </div>
            ) : (
              paginatedLeads.map((lead) => (
                <OpenMail
                  key={lead._id}
                  lead={lead}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteLead}
                >
                  <div
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !lead.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      if (!lead.isRead) markAsRead(lead._id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead._id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelectLead(lead._id);
                        }}
                        className="rounded border-gray-300"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-medium ${
                              !lead.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {lead.senderName || lead.senderEmail}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              lead.status
                            )}`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <AtSign className="w-3 h-3" />
                            {lead.senderEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            To: {lead.receiverEmail}
                          </span>
                        </div>
                        <p
                          className={`text-sm truncate ${
                            !lead.isRead
                              ? "font-medium text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {lead.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {lead.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(lead.createdAt)}
                        </span>
                        {!lead.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </OpenMail>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing {(currentPage - 1) * leadsPerPage + 1} to{" "}
                {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of{" "}
                {filteredLeads.length} results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
