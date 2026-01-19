import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Category, Priority, Status, type Todo } from "../../../types";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: any) => void;
  editingTodo: Todo | null;
}

const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTodo,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: Priority.MEDIUM,
    status: Status.TODO,
    category: Category.GENERAL,
    relatedLead: "",
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: editingTodo.dueDate,
        priority: editingTodo.priority,
        status: editingTodo.status,
        category: editingTodo.category,
        relatedLead: editingTodo.relatedLead || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
        priority: Priority.MEDIUM,
        status: Status.TODO,
        category: Category.GENERAL,
        relatedLead: "",
      });
    }
  }, [editingTodo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo) {
      onSave({ ...editingTodo, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            {editingTodo ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Task Title
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter task summary..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Provide more context..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Due Date
              </label>
              <input
                required
                type="date"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
              >
                <option value={Status.TODO}>To Do</option>
                <option value={Status.IN_PROGRESS}>In Progress</option>
                <option value={Status.COMPLETED}>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as any })
                }
              >
                <option value={Category.GENERAL}>General</option>
                <option value={Category.SALES}>Sales</option>
                <option value={Category.MARKETING}>Marketing</option>
                <option value={Category.TECHNICAL}>Technical</option>
                <option value={Category.FOLLOW_UP}>Follow Up</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Lead / Company (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Acme Corp"
              value={formData.relatedLead}
              onChange={(e) =>
                setFormData({ ...formData, relatedLead: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-100 cursor-pointer"
            >
              {editingTodo ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
