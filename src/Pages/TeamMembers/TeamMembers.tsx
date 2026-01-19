import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Edit2,
  Filter,
  Mail,
  MailQuestion,
  Plus,
  Search,
  Trash2,
  Users2,
  XCircle,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { MemberStatus, type CRMTeamMember } from "../../types";

const MOCK_TEAM: CRMTeamMember[] = [
  {
    id: "MEM-001",
    name: "Sarah Jenkins",
    jobTitle: "Sales Director",
    email: "sarah.j@nexus.com",
    department: "Sales",
    image: "https://picsum.photos/seed/sarah/200/200",
    status: MemberStatus.ACTIVE,
    joinedDate: "2023-01-15",
  },
  {
    id: "MEM-002",
    name: "Mike Ross",
    jobTitle: "Senior Engineer",
    email: "m.ross@nexus.com",
    department: "Engineering",
    image: "https://picsum.photos/seed/mike/200/200",
    status: MemberStatus.ACTIVE,
    joinedDate: "2023-05-10",
  },
  {
    id: "MEM-003",
    name: "Elena Wong",
    jobTitle: "Product Designer",
    email: "elena.w@nexus.com",
    department: "Design",
    image: "https://picsum.photos/seed/elena/200/200",
    status: MemberStatus.ACTIVE,
    joinedDate: "2023-03-22",
  },
  {
    id: "MEM-004",
    name: "Alex Johnson",
    jobTitle: "Chief Strategy Officer",
    email: "alex.j@nexus.com",
    department: "Leadership",
    image: "https://picsum.photos/seed/alex/200/200",
    status: MemberStatus.ACTIVE,
    joinedDate: "2022-11-01",
  },
  {
    id: "MEM-005",
    name: "Kiran Patel",
    jobTitle: "Growth Lead",
    email: "k.patel@nexus.com",
    department: "Marketing",
    image: "https://picsum.photos/seed/kiran/200/200",
    status: MemberStatus.INACTIVE,
    joinedDate: "2024-02-15",
  },
  {
    id: "MEM-006",
    name: "David Lee",
    jobTitle: "Customer Success",
    email: "d.lee@nexus.com",
    department: "Support",
    image: "https://picsum.photos/seed/david/200/200",
    status: MemberStatus.ACTIVE,
    joinedDate: "2023-08-12",
  },
];

const TeamMembers: React.FC = () => {
  const [team, setTeam] = useState<CRMTeamMember[]>(MOCK_TEAM);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | MemberStatus>("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;
      const matchesDept =
        deptFilter === "All" || member.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [team, search, statusFilter, deptFilter]);

  const departments = Array.from(new Set(team.map((m) => m.department)));
  const activeCount = team.filter(
    (m) => m.status === MemberStatus.ACTIVE,
  ).length;

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setTeam(team.filter((m) => m.id !== id));
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
            Team Intelligence
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Coordinate your workforce and monitor organizational health.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3.5   rounded-xl  font-bold transition-all   ">
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6   rounded-xl  border border-slate-100   flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600   rounded-xl  flex items-center justify-center">
              <Users2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total Members
              </p>
              <p className="text-2xl font-black text-slate-900">
                {team.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
              All Staff
            </span>
          </div>
        </div>

        <div className="bg-white p-6   rounded-xl  border border-slate-100   flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600   rounded-xl  flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Active Pulse
              </p>
              <p className="text-2xl font-black text-slate-900">
                {activeCount}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Live
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6   rounded-xl  text-white  flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 text-white   rounded-xl  flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
                Departments
              </p>
              <p className="text-2xl font-black">{departments.length}</p>
            </div>
          </div>
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mb-8">
        <div className="relative  group w-2xl">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100   rounded-xl  outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700  "
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-white border border-slate-100 p-2 rounded-xl  ">
            {(["All", MemberStatus.ACTIVE, MemberStatus.INACTIVE] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-3 rounded-lg text-[11px] font-black cursor-pointer uppercase tracking-wider transition-all ${
                    statusFilter === status
                      ? "bg-primary text-white "
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ),
            )}
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-4 py-5 text-[12px] font-black text-slate-600   hover:bg-slate-50 transition-all cursor-pointer">
            <Filter size={16} className="text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-transparent outline-none cursor-pointer appearance-none pr-4 px-5"
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* High-Resolution Data Table */}
      <div className="bg-white   rounded-xl  border border-slate-100   overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase ">
                Member Details
              </th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase ">
                Job Title
              </th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase ">
                Department
              </th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase ">
                Status
              </th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase ">
                Joined
              </th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase  w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTeam.map((member) => (
              <tr
                key={member.id}
                className="group hover:bg-slate-50/50 transition-all duration-300"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-12 h-12   rounded-xl  object-cover ring-2 ring-slate-100   transition-transform group-hover:scale-110 ${
                          member.status === MemberStatus.INACTIVE
                            ? "grayscale"
                            : ""
                        }`}
                      />
                      {member.status === MemberStatus.ACTIVE && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {member.name}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 lowercase">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-semibold text-slate-700">
                    {member.jobTitle}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md tracking-wider">
                    {member.department}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      member.status === MemberStatus.ACTIVE
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                    }`}
                  >
                    {member.status === MemberStatus.ACTIVE ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {member.status}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-bold text-slate-500">
                    {formatDate(member.joinedDate)}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl   transition-all border border-transparent hover:border-slate-100 cursor-pointer"
                      title="Email"
                    >
                      <Mail size={16} />
                    </button>
                    <button
                      className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl   transition-all border border-transparent hover:border-slate-100 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl   transition-all border border-transparent hover:border-slate-100 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTeam.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
              <MailQuestion size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Member Search Failed
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              We couldn't find any profiles matching your criteria. Try
              adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
