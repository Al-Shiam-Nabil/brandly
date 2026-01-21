import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronDown,
  Clock,
  Download,
  Filter,
  Search,
  Timer,
  Users,
} from "lucide-react";
import React, { useMemo, useState } from "react";

interface ReportEntry {
  id: string;
  member: string;
  project: string;
  client: string;
  task: string;
  startTime: string;
  endTime: string;
  totalHours: number;
}

const MOCK_REPORTS: ReportEntry[] = [
  {
    id: "R-001",
    member: "Sarah Jenkins",
    project: "Nexus Suite",
    client: "Internal",
    task: "UI Design Refinement",
    startTime: "09:00",
    endTime: "13:30",
    totalHours: 4.5,
  },
  {
    id: "R-002",
    member: "Mike Ross",
    project: "Project Atlas",
    client: "Globex Corp",
    task: "API Integration Audit",
    startTime: "10:15",
    endTime: "12:15",
    totalHours: 2.0,
  },
  {
    id: "R-003",
    member: "Elena Wong",
    project: "Mobile App",
    client: "Starlight Media",
    task: "Onboarding Flow Dev",
    startTime: "14:00",
    endTime: "18:00",
    totalHours: 4.0,
  },
  {
    id: "R-004",
    member: "Alex Johnson",
    project: "Strategic Planning",
    client: "Pied Piper",
    task: "Quarterly Review Prep",
    startTime: "08:30",
    endTime: "11:00",
    totalHours: 2.5,
  },
  {
    id: "R-005",
    member: "Sarah Jenkins",
    project: "Nexus Suite",
    client: "Internal",
    task: "Weekly Sync Meeting",
    startTime: "14:30",
    endTime: "15:30",
    totalHours: 1.0,
  },
];

const ReportsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");

  const filteredReports = useMemo(() => {
    return MOCK_REPORTS.filter((entry) => {
      const matchesSearch =
        entry.member.toLowerCase().includes(search.toLowerCase()) ||
        entry.task.toLowerCase().includes(search.toLowerCase()) ||
        entry.client.toLowerCase().includes(search.toLowerCase());
      const matchesProject =
        projectFilter === "All" || entry.project === projectFilter;
      return matchesSearch && matchesProject;
    });
  }, [search, projectFilter]);

  const projects = Array.from(new Set(MOCK_REPORTS.map((r) => r.project)));
  const totalBillable = filteredReports.reduce(
    (acc, curr) => acc + curr.totalHours,
    0,
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="max-w-full mx-auto animate-fadeIn">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Operational Reports
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Analyze team performance, billable hours, and project distribution.
          </p>
        </div>
        <div>
          {" "}
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3.5 rounded-xl font-bold transition-all ">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Bento Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-indigo-600 p-8 rounded-xl text-white  flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold uppercase">
              Total Hours Logged
            </span>
            <div className="p-2 bg-white/10 rounded-xl">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-4xl font-black">{totalBillable.toFixed(1)}h</p>
          <div className="mt-4 flex items-center gap-2 text-sm  ">
            <ArrowUpRight size={14} />
            +12% from last week
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-slate-100  flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-700 uppercase ">
              Active Members
            </span>
            <div className="p-2 bg-slate-50 text-indigo-600 rounded-xl">
              <Users size={20} />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">14</p>
          <div className="mt-4 text-sm text-emerald-600">
            8 currently tracking
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-slate-100  flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-700 uppercase ">
              Top Client
            </span>
            <div className="p-2 bg-slate-50 text-indigo-600 rounded-xl">
              <Briefcase size={20} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 truncate">
            Globex Corp
          </p>
          <div className="mt-4 text-sm  text-slate-500">
            Contributing 35% effort
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-xl text-white  flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold uppercase text-white">
              Workload Health
            </span>
            <div className="p-2 bg-white/10 rounded-xl">
              <BarChart3 size={20} />
            </div>
          </div>
          <p className="text-4xl font-black text-white">Optimal</p>
          <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[88%]"></div>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mb-8">
        <div className="relative  group flex-1  w-full lg:w-2xl">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by member, task, or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-4.5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700 "
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-6 py-4.5 text-xs font-bold text-slate-600  hover:bg-slate-50 transition-all cursor-pointer">
            <Filter size={16} className="text-slate-400" />
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer appearance-none  pr-6"
            >
              <option value="All">All Projects</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Modern Data Grid */}
      <div className="bg-white rounded-xl border border-slate-100  overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[1200px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6  font-bold text-slate-700 ">Member</th>
              <th className="px-10 py-6  font-bold text-slate-700 ">
                Project & Client
              </th>
              <th className="px-10 py-6  font-bold text-slate-700 ">Task</th>
              <th className="px-10 py-6  font-bold text-slate-700 ">
                Interval
              </th>
              <th className="px-10 py-6  font-bold text-slate-700  text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredReports.map((entry) => (
              <tr
                key={entry.id}
                className="group hover:bg-slate-50/50 transition-all duration-300"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-md">
                      {getInitials(entry.member)}
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-500 transition-colors">
                      {entry.member}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 tracking-tight">
                      {entry.project}
                    </span>
                    <span className="text-[12px] font-bold  text-slate-400 uppercase mt-1">
                      {entry.client}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8 max-w-xs">
                  <span className="text-sm font-medium text-slate-600 ">
                    {entry.task}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-slate-400 uppercase">
                        From
                      </span>
                      <span className="text-xs font-bold text-slate-700 mt-1">
                        {entry.startTime}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-slate-400 uppercase">
                        To
                      </span>
                      <span className="text-xs font-bold text-slate-700 mt-1">
                        {entry.endTime}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm border border-indigo-100">
                    <Timer size={14} />
                    {entry.totalHours.toFixed(1)}h
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReports.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <BarChart3 size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              No data entries
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              Adjust your filters to see historical reporting data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ArrowRight = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

export default ReportsPage;
