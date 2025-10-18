import React from "react";
import {
  Mail,
  AtSign,
  Clock,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { LeadBackend } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/app/ui/dialog";

interface OpenMailProps {
  lead: LeadBackend;
  onDelete: (leadId: string) => void;
  children: React.ReactNode;
}

const OpenMail: React.FC<OpenMailProps> = ({
  lead,
  onDelete,
  children,
}) => {
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
        className="max-w-4xl w-full max-h-[90vh] p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <DialogClose asChild>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </DialogClose>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle asChild>
                      <h2 className="text-xl font-bold">{lead.subject}</h2>
                    </DialogTitle>
                    <p className="text-slate-300 text-sm">Lead Details</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    lead.mailType
                  )}`}
                >
                  {lead.mailType.charAt(0).toUpperCase() +
                    lead.mailType.slice(1)}
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12" />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-140px)]">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Sender Info */}
              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {(lead.senderName || lead.senderEmail)
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {lead.senderName || "Unknown Sender"}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <AtSign className="w-4 h-4 mr-1" />
                          {lead.senderEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">To:</span>
                    <p className="font-medium text-gray-900">
                      {lead.receiverEmail}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Received:</span>
                    <p className="font-medium text-gray-900">{date}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <p className="text-gray-600">{time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                  <p className="text-gray-700">{lead.subject}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Message</h4>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {lead.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Sidebar */}
            <div className="w-full lg:w-80 bg-gray-50 p-6 border-l border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Actions</h4>

              <div className="space-y-4">
                {/* Status Selector */}

                {/* Danger Zone */}
                <div className="pt-4">
                  <button
                    onClick={() => onDelete(lead._id)}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Lead
                  </button>
                </div>

                {/* Lead Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-3">Lead Info</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Read Status:</span>
                      <span
                        className={
                          lead.isRead ? "text-green-600" : "text-blue-600"
                        }
                      >
                        {lead.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lead ID:</span>
                      <span className="font-mono text-xs text-gray-500">
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
