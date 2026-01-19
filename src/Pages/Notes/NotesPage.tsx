import {
  ArrowRight,
  Calendar,
  ChevronDown,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  StickyNote,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import type { CRMNote } from "../../types";
import NoteModal from "./NotesModal";

const MOCK_NOTES: CRMNote[] = [
  {
    id: "N-501",
    title: "Acme Corp: Customer Success Feedback",
    content:
      "Client requested more emphasis on real-time collaboration features...",
    createdAt: "2024-05-15T10:30:00Z",
    files: ["feedback_report.pdf", "meeting_summary.docx"],
  },
  {
    id: "N-502",
    title: "Product Engineering Sync",
    content:
      "Technical overview of the new distributed caching layer implementation...",
    createdAt: "2024-05-18T14:45:00Z",
    files: ["arch_diagram.png"],
  },
  {
    id: "N-503",
    title: "Q3 Sales Targets & Forecasts",
    content:
      "Reviewing the conservative vs. aggressive growth models for next quarter...",
    createdAt: "2024-05-20T09:00:00Z",
    files: ["q3_forecasts.xlsx"],
  },
  {
    id: "N-504",
    title: "UI/UX Design Standards",
    content: "Internal documentation for the Nexus Design System v4.0...",
    createdAt: "2024-05-21T16:20:00Z",
    files: [],
  },
];

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<CRMNote[]>(MOCK_NOTES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<CRMNote | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notes, search]);

  const handleSaveNote = (noteData: Omit<CRMNote, "id" | "createdAt">) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingNote.id ? { ...n, ...noteData } : n)),
      );
    } else {
      const newNote: CRMNote = {
        ...noteData,
        id: `N-${Math.floor(Math.random() * 1000) + 500}`,
        createdAt: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setEditingNote(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRelativeTime = (dateStr: string) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const diff =
      (new Date(dateStr).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);
    if (Math.abs(diff) < 1) return "Earlier Today";
    return rtf.format(Math.round(diff), "day");
  };

  return (
    <div className="max-w-full mx-auto animate-fadeIn">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Intelligence
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Repository of client notes, documentation, and technical drafts.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-8 py-3.5 cursor-pointer rounded-lg font-bold transition-all  "
        >
          <Plus size={20} />
          Add Entry
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row lg:justify-between items-center gap-4 mb-10">
        <div className="relative group w-2xl">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search knowledge repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-4.5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all font-medium text-slate-700   "
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-6 py-4.5 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all   ">
          Latest First
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Modern High-Density Table */}
      <div className="bg-white rounded-xl border border-slate-100    overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase  w-72">
                Created Date
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase ">
                Title
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase  w-80">
                Files
              </th>
              <th className="px-10 py-6 text-[12px] font-bold text-slate-400 uppercase  w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredNotes.map((note) => (
              <tr
                key={note.id}
                className="group hover:bg-slate-50/50 transition-all duration-300"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <Calendar size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 tracking-tight">
                        {formatDate(note.createdAt)}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase opacity-60">
                        {getRelativeTime(note.createdAt)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col max-w-lg">
                    <span
                      onClick={() => {
                        setEditingNote(note);
                        setIsModalOpen(true);
                      }}
                      className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug flex items-center gap-2"
                    >
                      {note.title}
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                      />
                    </span>
                    <span className="text-sm text-slate-400 font-medium line-clamp-1 mt-1.5 opacity-80">
                      {note.content}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-wrap gap-2">
                    {note.files.length > 0 ? (
                      note.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-white border border-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-600    hover:shadow-md transition-all cursor-pointer"
                        >
                          <FileText size={12} className="text-indigo-500" />
                          {file}
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                        Encrypted Repository
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all    opacity-0 group-hover:opacity-100 border border-transparent hover:border-slate-100">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredNotes.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <StickyNote size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Archive Empty</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              No documentation found matching your current query.
            </p>
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </div>
  );
};

export default NotesPage;
