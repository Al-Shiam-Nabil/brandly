import { FilePlus, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { CRMNote } from "../../types";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<CRMNote, "id" | "createdAt">) => void;
  editingNote?: CRMNote | null;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingNote,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [] as string[],
  });
  const [newFile, setNewFile] = useState("");

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        files: [...editingNote.files],
      });
    } else {
      setFormData({ title: "", content: "", files: [] });
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addFile = () => {
    if (newFile.trim()) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, newFile.trim()],
      }));
      setNewFile("");
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-900">
            {editingNote ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400  tracking-widest mb-2">
              Note Title
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-medium text-slate-700"
              placeholder="e.g. Q3 Sales Strategy"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 tracking-widest mb-2">
              Content
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-medium text-slate-700 resize-none"
              placeholder="Write your note details here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400  tracking-widest mb-2">
              Files / Attachments (Names)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-medium text-slate-700"
                placeholder="Filename.pdf"
                value={newFile}
                onChange={(e) => setNewFile(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFile())
                }
              />
              <button
                type="button"
                onClick={addFile}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <FilePlus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.files.map((file, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 border border-slate-200"
                >
                  {file}
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-lg"
            >
              {editingNote ? "Update Note" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
