import {
  Calendar,
  CalendarRange,
  Clock,
  FileText,
  Info,
  X,
} from "lucide-react";
import React from "react";
import { LeaveStatus, type CRMLeave } from "../../types";

interface LeaveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  leave: CRMLeave | null;
}

const LeaveDetailModal: React.FC<LeaveDetailModalProps> = ({
  isOpen,
  onClose,
  leave,
}) => {
  if (!isOpen || !leave) return null;

  const getStatusStyle = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED:
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case LeaveStatus.PENDING:
        return "bg-amber-50 text-amber-600 border-amber-100";
      case LeaveStatus.REJECTED:
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const formatDateLong = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-slideUp border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-xl shadow-indigo-100">
              {leave.memberName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {leave.memberName}
              </h2>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border mt-1 ${getStatusStyle(leave.status)}`}
              >
                {leave.status}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10">
          <div className="grid grid-cols-2 gap-10 mb-10">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  <Calendar size={14} className="text-indigo-500" />
                  Leave Type
                </label>
                <p className="text-lg font-bold text-slate-900">{leave.type}</p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  <Clock size={14} className="text-indigo-500" />
                  Duration
                </label>
                <p className="text-lg font-bold text-slate-900">
                  {leave.duration} Working Days
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  <CalendarRange size={14} className="text-indigo-500" />
                  Time Period
                </label>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase w-10 tracking-tighter">
                      From
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatDateLong(leave.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase w-10 tracking-tighter">
                      To
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatDateLong(leave.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <FileText size={14} className="text-indigo-500" />
              Reason for absence
            </label>
            <p className="text-slate-600 leading-relaxed font-medium italic">
              "{leave.reason}"
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between p-6 bg-slate-900 rounded-xl text-white">
            <div className="flex items-center gap-3">
              <Info size={18} className="text-indigo-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Submitted on
                </p>
                <p className="text-xs font-black">
                  {formatDateLong(leave.appliedDate)}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {leave.status === LeaveStatus.PENDING && (
                <>
                  <button className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                    Reject
                  </button>
                  <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/50">
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-slate-50/50 text-center border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Reference ID: {leave.id} • Corporate Compliance Verified
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailModal;
