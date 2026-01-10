"use client";

import React from "react";
import { Mail, AtSign, Clock, Trash2, ArrowLeft } from "lucide-react";
import { LeadBackend } from "@/types";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/app/ui/dialog";

interface OpenMailProps {
  lead: LeadBackend;
  onDelete: (leadId: string) => void;
  children: React.ReactNode;
}

const OpenMail: React.FC<OpenMailProps> = ({ lead, onDelete, children }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500 text-white";
      case "in-progress":
        return "bg-amber-500 text-white";
      case "replied":
        return "bg-green-500 text-white";
      case "closed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const { date, time } = formatDateTime(lead.createdAt);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-full sm:max-w-3xl md:max-w-4xl w-full max-h-[90vh] p-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="relative bg-linear-to-r from-slate-900 to-slate-700 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DialogClose asChild>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </DialogClose>

                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>

                <div className="truncate">
                  <DialogTitle asChild>
                    <h2 className="text-lg sm:text-xl font-bold truncate">{lead.subject}</h2>
                  </DialogTitle>
                  <p className="text-slate-300 text-xs sm:text-sm truncate">Lead Details</p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                  lead.mailType
                )}`}
              >
                {lead.mailType.charAt(0).toUpperCase() + lead.mailType.slice(1)}
              </span>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full transform translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full transform -translate-x-8 translate-y-8" />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)] overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {/* Sender Info */}
              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {(lead.senderName || lead.senderEmail).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                      {lead.senderName || "Unknown Sender"}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1 truncate">
                      <span className="flex items-center truncate">
                        <AtSign className="w-3 h-3 mr-1 shrink-0" />
                        {lead.senderEmail}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500">To:</span>
                    <p className="font-medium text-gray-900 truncate">{lead.receiverEmail}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Received:</span>
                    <p className="font-medium text-gray-900">{date}</p>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-600 mt-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <p>{time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Subject</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">{lead.subject}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Message</h4>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{lead.content}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Sidebar */}
            <div className="w-full lg:w-80 bg-gray-50 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Actions</h4>

              <div className="space-y-4">
                {/* Danger Zone */}
                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={() => onDelete(lead._id)}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Delete Lead
                  </button>
                </div>

                {/* Lead Info */}
                <div className="pt-2 sm:pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Lead Info</h5>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Read Status:</span>
                      <span className={lead.isRead ? "text-green-600" : "text-blue-600"}>
                        {lead.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lead ID:</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-500 truncate">
                        {lead._id.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenMail;