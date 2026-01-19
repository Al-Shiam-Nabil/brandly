import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  Timer,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { TaskStatus, type CRMTask } from "../../types";

const MOCK_TASKS: CRMTask[] = [
  {
    id: "T-2041",
    title: "Update Global Security Policies",
    startDate: "2024-05-01",
    deadline: "2024-05-20",
    milestone: "Sprint 4",
    relatedTo: "Project Atlas",
    assignedTo: "Sarah Jenkins",
    collaborators: [
      { name: "Mike Ross", avatar: "" },
      { name: "David Lee", avatar: "" },
    ],
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: "T-2042",
    title: "Q2 Performance Analysis",
    startDate: "2024-05-10",
    deadline: "2024-05-25",
    milestone: "Board Review",
    relatedTo: "Strategic Planning",
    assignedTo: "Alex Johnson",
    collaborators: [{ name: "Kiran Patel", avatar: "" }],
    status: TaskStatus.REVIEW,
  },
  {
    id: "T-2043",
    title: "Customer Onboarding Flow",
    startDate: "2024-04-15",
    deadline: "2024-05-05",
    milestone: "Launch V2",
    relatedTo: "Mobile App",
    assignedTo: "Elena Wong",
    collaborators: [],
    status: TaskStatus.COMPLETED,
  },
  {
    id: "T-2044",
    title: "API Integration Audit",
    startDate: "2024-05-14",
    deadline: "2024-06-01",
    milestone: "Infrastructure",
    relatedTo: "Project Atlas",
    assignedTo: "Mike Ross",
    collaborators: [{ name: "Sarah Jenkins", avatar: "" }],
    status: TaskStatus.PENDING,
  },
];

const TasksPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.id.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return {
          label: "Completed",
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          icon: <CheckCircle2 size={12} />,
        };
      case TaskStatus.IN_PROGRESS:
        return {
          label: "In Progress",
          color: "text-blue-600",
          bg: "bg-blue-50",
          icon: <Timer size={12} />,
        };
      case TaskStatus.REVIEW:
        return {
          label: "Under Review",
          color: "text-violet-600",
          bg: "bg-violet-50",
          icon: <Layers size={12} />,
        };
      case TaskStatus.PENDING:
        return {
          label: "Pending",
          color: "text-amber-600",
          bg: "bg-amber-50",
          icon: <Clock size={12} />,
        };
      default:
        return {
          label: status,
          color: "text-slate-600",
          bg: "bg-slate-50",
          icon: null,
        };
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className=" max-w-full mx-auto animate-fadeIn">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Tasks Repository
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage enterprise-wide deliverables and team assignments.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all ">
          <Plus size={20} />
          Create Task
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mb-8">
        <div className="relative w-2xl group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by ID, title, or assignee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700 "
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-4  ">
            <Filter size={16} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent outline-none text-sm font-bold text-slate-600 cursor-pointer appearance-none pr-2 px-2"
            >
              <option value="All">All Status</option>
              {Object.values(TaskStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Modern Grid Table */}
      <div className="bg-white rounded-xl border border-slate-100   overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[1400px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em] w-24">
                ID
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Title
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Start Date
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Deadline
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Milestone
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Related To
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Assigned To
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Collaborators
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-6 py-5 text-[12px] font-semibold whitespace-nowrap text-slate-400 uppercase tracking-[0.2em]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTasks.map((task) => {
              const status = getStatusConfig(task.status);
              return (
                <tr
                  key={task.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-6">
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      {task.id}
                    </span>
                  </td>
                  <td className="px-6 py-6 max-w-xs">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-tight">
                      {task.title}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-600">
                      {formatDate(task.startDate)}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg border border-rose-100">
                      {formatDate(task.deadline)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
                      {task.milestone}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <ArrowUpRight size={12} className="text-indigo-500" />
                      {task.relatedTo}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                        {getInitials(task.assignedTo)}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {task.assignedTo}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex -space-x-2">
                      {task.collaborators.length > 0 ? (
                        task.collaborators.map((c, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-lg bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-600 hover:scale-110 transition-transform cursor-help  "
                            title={c.name}
                          >
                            {getInitials(c.name)}
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          None
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${status.bg} ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all   opacity-0 group-hover:opacity-100 border border-transparent hover:border-slate-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <p className="text-slate-900 font-bold">No tasks found</p>
            <p className="text-slate-500 text-sm mt-1">
              Try changing your search parameters or clearing filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
