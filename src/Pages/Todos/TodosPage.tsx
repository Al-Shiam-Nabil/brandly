import TodoModal from "../../Components/Dashboard/Todo/TodoModal";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Category,
  Priority,
  Status,
  type Todo,
  type TodoFilter,
} from "../../types";

const MOCK_TODOS: Todo[] = [
  {
    id: "1",
    title: "Follow up with Acme Corp regarding Q4 contract",
    description: "Call Sarah to discuss the new pricing model and sign-off.",
    dueDate: "2024-05-20",
    priority: Priority.HIGH,
    status: Status.TODO,
    category: Category.SALES,
    relatedLead: "Acme Corp",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Update marketing campaign assets",
    description: "Review the new banners for the Summer Sale.",
    dueDate: "2024-05-22",
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
    category: Category.MARKETING,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Bug fix for customer portal",
    description: "Login page is timing out for some IE users.",
    dueDate: "2024-05-18",
    priority: Priority.HIGH,
    status: Status.COMPLETED,
    category: Category.TECHNICAL,
    createdAt: new Date().toISOString(),
  },
];

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("nexus_todos");
    return saved ? JSON.parse(saved) : MOCK_TODOS;
  });
  const [filter, setFilter] = useState<TodoFilter>({
    search: "",
    status: "All",
    priority: "All",
    category: "All",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("nexus_todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        todo.description.toLowerCase().includes(filter.search.toLowerCase());
      const matchesStatus =
        filter.status === "All" || todo.status === filter.status;
      const matchesPriority =
        filter.priority === "All" || todo.priority === filter.priority;
      const matchesCategory =
        filter.category === "All" || todo.category === filter.category;
      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [todos, filter]);

  const handleAddTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todo,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setIsModalOpen(false);
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  return (
    <div className=" max-w-full mx-auto animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Management</h1>
          <p className="text-slate-500 mt-1">
            Manage your team's workflow and sales pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingTodo(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative col-span-1 md:col-span-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4">
          <Filter size={16} className="text-slate-400" />
          <select
            className="flex-1 py-2 bg-transparent outline-none text-sm font-medium text-slate-700"
            value={filter.status}
            onChange={(e) =>
              setFilter({ ...filter, status: e.target.value as any })
            }
          >
            <option value="All">All Statuses</option>
            <option value={Status.TODO}>To Do</option>
            <option value={Status.IN_PROGRESS}>In Progress</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4">
          <AlertCircle size={16} className="text-slate-400" />
          <select
            className="flex-1 py-2 bg-transparent outline-none text-sm font-medium text-slate-700"
            value={filter.priority}
            onChange={(e) =>
              setFilter({ ...filter, priority: e.target.value as any })
            }
          >
            <option value="All">All Priorities</option>
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4">
          <Calendar size={16} className="text-slate-400" />
          <select
            className="flex-1 py-2 bg-transparent outline-none text-sm font-medium text-slate-700"
            value={filter.category}
            onChange={(e) =>
              setFilter({ ...filter, category: e.target.value as any })
            }
          >
            <option value="All">All Categories</option>
            <option value={Category.SALES}>Sales</option>
            <option value={Category.MARKETING}>Marketing</option>
            <option value={Category.TECHNICAL}>Technical</option>
            <option value={Category.FOLLOW_UP}>Follow Up</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Tasks</p>
          <p className="text-2xl font-bold text-slate-900">{todos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">In Progress</p>
          <p className="text-2xl font-bold text-amber-600">
            {todos.filter((t) => t.status === Status.IN_PROGRESS).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">
            {todos.filter((t) => t.status === Status.COMPLETED).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">High Priority</p>
          <p className="text-2xl font-bold text-rose-600">
            {todos.filter((t) => t.priority === Priority.HIGH).length}
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Task Details
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <span
                          className={`font-semibold text-slate-900 ${todo.status === Status.COMPLETED ? "line-through text-slate-400" : ""}`}
                        >
                          {todo.title}
                        </span>
                        <span className="text-sm text-slate-500 line-clamp-1 mt-0.5">
                          {todo.description}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock size={14} className="text-slate-400" />
                          <span className="text-xs text-slate-500">
                            Due {todo.dueDate}
                          </span>
                          {todo.relatedLead && (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {todo.relatedLead}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          todo.status === Status.COMPLETED
                            ? "bg-emerald-50 text-emerald-700"
                            : todo.status === Status.IN_PROGRESS
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {todo.status === Status.COMPLETED ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {todo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          todo.priority === Priority.HIGH
                            ? "bg-rose-100 text-rose-700"
                            : todo.priority === Priority.MEDIUM
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-600">
                        {todo.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 ">
                        <button
                          onClick={() => {
                            setEditingTodo(todo);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-100 p-4 rounded-full mb-3 text-slate-400">
                        <Search size={32} />
                      </div>
                      <p className="text-lg font-medium">No tasks found</p>
                      <p className="text-sm">
                        Try adjusting your filters or add a new task.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
        }}
        onSave={editingTodo ? handleEditTodo : handleAddTodo}
        editingTodo={editingTodo}
      />
    </div>
  );
}
