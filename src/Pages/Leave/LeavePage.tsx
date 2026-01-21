import {
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Plane,
  Plus,
  Search,
  Stethoscope,
  User,
  XCircle,
} from "lucide-react";
import React, { useMemo, useState } from "react";

import { LeaveStatus, LeaveType, type CRMLeave } from "../../types";
import LeaveDetailModal from "./LeaveDetailModal";

const MOCK_LEAVES: CRMLeave[] = [
  {
    id: "LV-001",
    memberId: "MEM-001",
    memberName: "Sarah Jenkins",
    type: LeaveType.VACATION,
    startDate: "2024-06-10",
    endDate: "2024-06-17",
    duration: 8,
    status: LeaveStatus.APPROVED,
    reason: "Summer holiday trip to Europe with family.",
    appliedDate: "2024-05-15",
  },
  {
    id: "LV-002",
    memberId: "MEM-002",
    memberName: "Mike Ross",
    type: LeaveType.SICK_LEAVE,
    startDate: "2024-05-20",
    endDate: "2024-05-21",
    duration: 2,
    status: LeaveStatus.PENDING,
    reason: "Medical checkup and recovery from fever.",
    appliedDate: "2024-05-18",
  },
  {
    id: "LV-003",
    memberId: "MEM-003",
    memberName: "Elena Wong",
    type: LeaveType.PERSONAL,
    startDate: "2024-05-25",
    endDate: "2024-05-25",
    duration: 1,
    status: LeaveStatus.APPROVED,
    reason: "Personal errands and family event.",
    appliedDate: "2024-05-19",
  },
  {
    id: "LV-004",
    memberId: "MEM-004",
    memberName: "Alex Johnson",
    type: LeaveType.MATERNITY,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    duration: 92,
    status: LeaveStatus.PENDING,
    reason: "Parental leave for new family member.",
    appliedDate: "2024-05-10",
  },
  {
    id: "LV-005",
    memberId: "MEM-005",
    memberName: "Kiran Patel",
    type: LeaveType.BEREAVEMENT,
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    duration: 3,
    status: LeaveStatus.REJECTED,
    reason: "Family emergency support.",
    appliedDate: "2024-04-28",
  },
];

const LeavePage: React.FC = () => {
  const [leaves, setLeaves] = useState<CRMLeave[]>(MOCK_LEAVES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeaveStatus>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | LeaveType>("All");
  const [selectedLeave, setSelectedLeave] = useState<CRMLeave | null>(null);

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesSearch =
        leave.memberName.toLowerCase().includes(search.toLowerCase()) ||
        leave.reason.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || leave.status === statusFilter;
      const matchesType = typeFilter === "All" || leave.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leaves, search, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = leaves.length;
    const pending = leaves.filter(
      (l) => l.status === LeaveStatus.PENDING,
    ).length;
    const approved = leaves.filter(
      (l) => l.status === LeaveStatus.APPROVED,
    ).length;
    return { total, pending, approved };
  }, [leaves]);

  const getLeaveIcon = (type: LeaveType) => {
    switch (type) {
      case LeaveType.VACATION:
        return <Plane size={18} className="text-indigo-500" />;
      case LeaveType.SICK_LEAVE:
        return <Stethoscope size={18} className="text-rose-500" />;
      case LeaveType.MATERNITY:
      case LeaveType.PATERNITY:
        return <CalendarIcon size={18} className="text-violet-500" />;
      default:
        return <User size={18} className="text-slate-400" />;
    }
  };

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

  return (
    <div className=" max-w-full mx-auto animate-fadeIn">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Leave Management
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Monitor team availability, leave balances, and absence trends.
          </p>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3.5  rounded-xl font-bold transition-all -xl -slate-200">
            <Plus size={20} />
            Apply for Leave
          </button>
        </div>
      </div>

      {/* Stats Summary Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 -sm flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600  rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <CalendarIcon size={24} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-500 uppercase ">
                Total Monthly
              </p>
              <p className="text-2xl font-black text-slate-900">
                {stats.total}
              </p>
            </div>
          </div>
          <div className="h-full flex items-end">
            <span className="text-[12px] font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
              All Types
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 -sm flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600  rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock size={24} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-500 uppercase ">
                Awaiting Decision
              </p>
              <p className="text-2xl font-black text-slate-900">
                {stats.pending}
              </p>
            </div>
          </div>
          <div className="h-full flex items-end">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mb-2"></div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-white -2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 text-white  rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-300 uppercase ">
                Success Rate
              </p>
              <p className="text-2xl font-black text-white">
                {((stats.approved / (stats.total || 1)) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[12px] font-bold text-slate-300  ">
              Approved
            </span>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mb-8">
        <div className="relative  group flex-1 w-full ">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-100  rounded-xl outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700 -sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-white border border-slate-100 p-2 rounded-xl -sm">
            {(["All", LeaveStatus.APPROVED, LeaveStatus.PENDING] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase  transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-slate-900 text-white -lg"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ),
            )}
          </div>
          <div className="flex  items-center gap-2 bg-white border border-slate-100 rounded-xl px-4 py-4 text-[12px] font-bold  text-slate-500 -sm hover:bg-slate-50 transition-all cursor-pointer">
            <Filter size={16} className="text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="bg-transparent outline-none cursor-pointer appearance-none pr-4 uppercase"
            >
              <option value="All">All Types</option>
              {Object.values(LeaveType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* High-Resolution Data Table */}
      <div className="bg-white rounded-xl border border-slate-100 -sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5  font-bold text-slate-700 ">
                Team Member
              </th>
              <th className="px-8 py-5  font-bold text-slate-700 ">
                Leave Type
              </th>
              <th className="px-8 py-5  font-bold text-slate-700 ">Date</th>
              <th className="px-8 py-5  font-bold text-slate-700 ">Duration</th>
              <th className="px-8 py-5  font-bold text-slate-700 ">Status</th>
              <th className="px-8 py-5  font-bold text-slate-700  w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLeaves.map((leave) => (
              <tr
                key={leave.id}
                className="group hover:bg-slate-50/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedLeave(leave)}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 text-white  rounded-xl flex items-center justify-center text-[10px] font-black -md">
                      {leave.memberName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-500 transition-colors">
                        {leave.memberName}
                      </span>
                      <span className="text-[12px] font-semibold text-slate-500 mt-2 uppercase  ">
                        Applied: {leave.appliedDate}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                      {getLeaveIcon(leave.type)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {leave.type}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-700">
                      {new Date(leave.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(leave.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-100">
                    {leave.duration} {leave.duration > 1 ? "Days" : "Day"}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold  border ${getStatusStyle(leave.status)}`}
                  >
                    {leave.status === LeaveStatus.APPROVED ? (
                      <CheckCircle2 size={12} />
                    ) : leave.status === LeaveStatus.PENDING ? (
                      <Clock size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {leave.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl -sm transition-all border border-transparent hover:border-slate-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLeave(leave);
                    }}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeaves.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <CalendarIcon size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              No leave records found
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              Zero absence logs match your current query.
            </p>
          </div>
        )}
      </div>

      <LeaveDetailModal
        isOpen={!!selectedLeave}
        onClose={() => setSelectedLeave(null)}
        leave={selectedLeave}
      />
    </div>
  );
};

export default LeavePage;
