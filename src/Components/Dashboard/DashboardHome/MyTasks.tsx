import {
  Calendar,
  Clock,
  Hash,
  Inbox,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import type { Task } from "../../../types";

const ALL_TASKS: Task[] = [
  {
    id: "TSK-1024",
    title: "Finalize Q4 Marketing Deck",
    startDate: "2023-10-20",
    deadline: "2023-10-28",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Alex Rivera", avatar: "" },
  },
  {
    id: "TSK-1025",
    title: "API Integration with Stripe",
    startDate: "2023-10-22",
    deadline: "2023-11-05",
    status: "Pending",
    priority: "Medium",
    assignee: { name: "Sarah Chen", avatar: "" },
  },
  {
    id: "TSK-1026",
    title: "Client Onboarding - Acme Corp",
    startDate: "2023-10-15",
    deadline: "2023-10-24",
    status: "Overdue",
    priority: "High",
    assignee: { name: "Mike Johnson", avatar: "" },
  },
  {
    id: "TSK-1027",
    title: "Refactor Authentication Flow",
    startDate: "2023-10-18",
    deadline: "2023-10-22",
    status: "Completed",
    priority: "Low",
    assignee: { name: "Alex Rivera", avatar: "" },
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-rose-500";
    case "Medium":
      return "bg-amber-500";
    case "Low":
      return "bg-emerald-500";
    default:
      return "bg-slate-300";
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "In Progress":
      return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "Pending":
      return "bg-slate-50 text-slate-500 border-slate-100";
    case "Overdue":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-500 border-slate-100";
  }
};

export default function MyTasks() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      {/* Search and Filters Header */}
      <div className="p-6 border-b border-slate-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Hash className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Task Explorer</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID or Title..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
            <select
              //   value={statusFilter}
              //   onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-600 outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-sm">
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Task Title</th>
              <th className="px-6 py-4">Timeline</th>
              <th className="px-6 py-4 text-center">Status</th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ALL_TASKS.length > 0 ? (
              ALL_TASKS.map((task) => (
                <tr
                  key={task.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {task.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority)}`}
                      ></div>
                      <span className="text-sm font-semibold text-slate-700">
                        {task.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-300" />
                        {new Date(task.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-500">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(task.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-tight ${getStatusStyle(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </td>
                  {/* <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600"></div>
                    </div>
                  </td> */}
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="flex flex-col items-center">
                    <Inbox className="w-10 h-10 text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400">
                      No tasks match your criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {ALL_TASKS.length} Result{ALL_TASKS.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50">
            Prev
          </button>
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
