import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  Plus,
  Search,
  User,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { ProjectStatus, type Project } from "../../types";

const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "Enterprise CRM Migration",
    client: "Globex Corp",
    startDate: "2024-01-15",
    deadline: "2024-06-30",
    progress: 65,
    status: ProjectStatus.ACTIVE,
  },
  {
    id: "PRJ-002",
    title: "Mobile App Redesign",
    client: "Starlight Media",
    startDate: "2024-02-01",
    deadline: "2024-05-15",
    progress: 85,
    status: ProjectStatus.ACTIVE,
  },
  {
    id: "PRJ-003",
    title: "Security Audit Q2",
    client: "Pied Piper",
    startDate: "2024-03-20",
    deadline: "2024-04-10",
    progress: 100,
    status: ProjectStatus.COMPLETED,
  },
  {
    id: "PRJ-004",
    title: "Cloud Infrastructure Setup",
    client: "Initech",
    startDate: "2024-04-01",
    deadline: "2024-08-20",
    progress: 15,
    status: ProjectStatus.PLANNING,
  },
  {
    id: "PRJ-005",
    title: "Social Media Campaign",
    client: "Umbrella Corp",
    startDate: "2024-01-10",
    deadline: "2024-02-28",
    progress: 45,
    status: ProjectStatus.ON_HOLD,
  },
];

const ProjectsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">(
    "All",
  );

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase()) ||
        project.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return "bg-blue-50 text-blue-700 border-blue-100";
      case ProjectStatus.COMPLETED:
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case ProjectStatus.ON_HOLD:
        return "bg-amber-50 text-amber-700 border-amber-100";
      case ProjectStatus.PLANNING:
        return "bg-slate-50 text-slate-700 border-slate-100";
      case ProjectStatus.CANCELLED:
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className=" max-w-full mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Projects Overview
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Track development, milestones, and client deliverables.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-100">
          <Plus size={20} />
          Launch New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Clock size={18} />
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Active
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900">12</p>
          <p className="text-xs text-slate-500 mt-2">+2 since last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Completed
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900">48</p>
          <p className="text-xs text-slate-500 mt-2">Overall project success</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <AlertCircle size={18} />
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              On Hold
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900">3</p>
          <p className="text-xs text-slate-500 mt-2">
            Awaiting client feedback
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar size={18} />
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Pipeline
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900">$2.4M</p>
          <p className="text-xs text-slate-500 mt-2">Projected revenue</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects, clients, IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-medium text-slate-700"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 ">
            <Filter size={18} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent outline-none text-sm font-bold text-slate-600 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {Object.values(ProjectStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-slate-100  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
                  ID & Title
                </th>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
                  Client
                </th>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
                  Timeline
                </th>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
                  Progress
                </th>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-[12px] font-semibold text-slate-500 uppercase tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-indigo-600 uppercase mb-1">
                        {project.id}
                      </span>
                      <span className="text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <User size={14} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {project.client}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-12 font-bold uppercase tracking-tighter opacity-50">
                          Start
                        </span>
                        <span className="font-medium">
                          {new Date(project.startDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-12 font-bold uppercase tracking-tighter opacity-50">
                          End
                        </span>
                        <span className="font-medium">
                          {new Date(project.deadline).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            project.progress === 100
                              ? "bg-emerald-500"
                              : "bg-indigo-600"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                        <Search size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        No projects found
                      </h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                        We couldn't find any projects matching your current
                        search and filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All");
                        }}
                        className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Pagination Placeholder */}
      <div className="mt-8 flex items-center justify-between px-4">
        <p className="text-sm font-medium text-slate-500">
          Showing{" "}
          <span className="text-slate-900 font-bold">
            {filteredProjects.length}
          </span>{" "}
          of{" "}
          <span className="text-slate-900 font-bold">
            {MOCK_PROJECTS.length}
          </span>{" "}
          projects
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-bold text-slate-400 cursor-not-allowed">
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm">
              1
            </button>
          </div>
          <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
