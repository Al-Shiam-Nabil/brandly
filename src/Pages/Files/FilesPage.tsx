import {
  Archive,
  ArrowRight,
  Download,
  FileCode,
  FileText,
  Filter,
  // Fix: Added missing FolderOpen icon import
  FolderOpen,
  HardDrive,
  Image as ImageIcon,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import type { CRMFile } from "../../types";

const MOCK_FILES: CRMFile[] = [
  {
    id: "F-101",
    name: "Q3_Financial_Summary.pdf",
    type: "PDF Document",
    size: "2.4 MB",
    uploadedAt: "2024-05-18T10:30:00Z",
    owner: "Sarah Jenkins",
    sharedWith: [
      { name: "Alex Johnson", avatar: "" },
      { name: "Mike Ross", avatar: "" },
    ],
  },
  {
    id: "F-102",
    name: "Brand_Guidelines_V4.png",
    type: "PNG Image",
    size: "14.8 MB",
    uploadedAt: "2024-05-20T14:45:00Z",
    owner: "Elena Wong",
    sharedWith: [{ name: "Sarah Jenkins", avatar: "" }],
  },
  {
    id: "F-103",
    name: "Auth_Service_Protocol.ts",
    type: "TypeScript File",
    size: "12 KB",
    uploadedAt: "2024-05-21T09:00:00Z",
    owner: "Mike Ross",
    sharedWith: [],
  },
  {
    id: "F-104",
    name: "User_Interviews_Backup.zip",
    type: "ZIP Archive",
    size: "142 MB",
    uploadedAt: "2024-05-22T16:20:00Z",
    owner: "Elena Wong",
    sharedWith: [{ name: "Kiran Patel", avatar: "" }],
  },
  {
    id: "F-105",
    name: "Nexus_Marketing_Plan.pdf",
    type: "PDF Document",
    size: "1.1 MB",
    uploadedAt: "2024-05-23T11:00:00Z",
    owner: "Sarah Jenkins",
    sharedWith: [{ name: "Mike Ross", avatar: "" }],
  },
];

const FilesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredFiles = useMemo(() => {
    return MOCK_FILES.filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.owner.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        filterType === "All" || file.type.includes(filterType);
      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  const getFileIcon = (type: string) => {
    if (type.includes("PDF"))
      return <FileText size={20} className="text-rose-500" />;
    if (type.includes("Image"))
      return <ImageIcon size={20} className="text-blue-500" />;
    if (type.includes("TypeScript") || type.includes("File"))
      return <FileCode size={20} className="text-emerald-500" />;
    if (type.includes("Archive"))
      return <Archive size={20} className="text-amber-500" />;
    return <FileText size={20} className="text-slate-400" />;
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
    <div className="max-w-full mx-auto animate-fadeIn">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Cloud Assets
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Unified repository for project documentation and media assets.
          </p>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all ">
            <Upload size={20} />
            Upload Files
          </button>
        </div>
      </div>

      {/* Storage Intelligence Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-100  flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Storage Capacity
              </span>
              <HardDrive size={18} className="text-indigo-600" />
            </div>
            <div className="flex items-end gap-3 mb-4">
              <p className="text-5xl font-black text-slate-900 tracking-tighter">
                4.2 <span className="text-2xl text-slate-400">GB</span>
              </p>
              <p className="text-sm font-bold text-slate-400 mb-2">
                of 20 GB used
              </p>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-indigo-600 h-full w-[15%]" title="PDFs"></div>
              <div className="bg-blue-400 h-full w-[10%]" title="Images"></div>
              <div
                className="bg-amber-400 h-full w-[20%]"
                title="Archives"
              ></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full translate-x-20 -translate-y-20 blur-3xl group-hover:bg-indigo-100/50 transition-colors"></div>
        </div>
        <div className="bg-slate-900 p-8 rounded-xl text-white  flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
              Quick Summary
            </span>
            <Archive size={18} className="opacity-50" />
          </div>
          <div>
            <p className="text-3xl font-black">{MOCK_FILES.length} Files</p>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
              Across 4 Departments
            </p>
          </div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mt-4 group cursor-pointer">
            Review Policies
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* Search & Filter Command Strip */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mb-10">
        <div className="relative group flex-1 w-full lg:w-2xl">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by file name or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-4.5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700 "
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-6 py-5 text-xs font-bold text-slate-600  hover:bg-slate-50 transition-all cursor-pointer">
            <Filter size={16} className="text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent outline-none cursor-pointer appearance-none pr-6"
            >
              <option value="All">All Types</option>
              <option value="PDF">PDF Documents</option>
              <option value="Image">Media Assets</option>
              <option value="Archive">Archives</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modern High-Density Table */}
      <div className="bg-white rounded-xl border border-slate-100  overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[1200px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Name
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Type
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Size
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Uploaded
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Shared With
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredFiles.map((file) => (
              <tr
                key={file.id}
                className="group hover:bg-slate-50/50 transition-all duration-300"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl     flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer tracking-tight">
                        {file.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase opacity-60">
                        Uploaded by {file.owner}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="text-sm font-semibold text-slate-600">
                    {file.type}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    {file.size}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <span className="text-sm font-medium text-slate-500">
                    {formatDate(file.uploadedAt)}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex -space-x-2">
                    {file.sharedWith.length > 0 ? (
                      file.sharedWith.map((user, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-xl bg-indigo-600 border-2 border-white flex items-center justify-center text-[9px] font-black text-white     hover:z-10 transition-all cursor-help"
                          title={user.name}
                        >
                          {getInitials(user.name)}
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                        Private
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-3  transition-all">
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl     transition-all border border-transparent hover:border-slate-100">
                      <Download size={18} />
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl     transition-all border border-transparent hover:border-slate-100">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl     transition-all border border-transparent hover:border-slate-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFiles.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <FolderOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Zero files found
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              We couldn't find any assets matching your current search
              parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
