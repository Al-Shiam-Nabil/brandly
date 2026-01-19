import {
  Check,
  CheckCircle2,
  Circle,
  Edit3,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import type { TodosType } from "../../types";

export default function Todo() {
  const [todos, setTodos] = useState<TodosType[]>(() => {
    const saved = localStorage.getItem("nexus-todos");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            text: "Review quarterly budget",
            completed: false,
            createdAt: Date.now(),
          },
          {
            id: "2",
            text: "Update client onboarding docs",
            completed: true,
            createdAt: Date.now() - 100000,
          },
        ];
  });
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("nexus-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: TodosType = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setTodos(
      todos.map((t) =>
        t.id === editingId ? { ...t, text: editValue.trim() } : t,
      ),
    );
    setEditingId(null);
  };
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col h-auto overflow-hidden w-full">
      <div className="p-8">
        <h2 className="text-lg  font-bold text-slate-900 tracking-tight mb-6">
          Add Todo
        </h2>

        <form onSubmit={addTodo} className="relative group mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-90 cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[3px]" />
          </button>
        </form>

        <div className="space-y-3 max-h-100 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  todo.completed
                    ? "bg-slate-50/50 border-transparent opacity-60"
                    : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`shrink-0 transition-colors ${
                    todo.completed
                      ? "text-emerald-500"
                      : "text-slate-300 hover:text-indigo-500"
                  }`}
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-50" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                {editingId === todo.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      className="flex-1 bg-white border border-indigo-200 rounded-lg px-2 py-1 text-sm outline-none ring-2 ring-indigo-50"
                    />
                    <button
                      onClick={saveEdit}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 text-sm font-semibold transition-all overflow-hidden ${
                        todo.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                <Check className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm font-bold text-slate-400">All caught up!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto px-8 py-4 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {todos.filter((t) => t.completed).length} / {todos.length} Done
        </span>
        {todos.some((t) => t.completed) && (
          <button
            onClick={() => setTodos(todos.filter((t) => !t.completed))}
            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline cursor-pointer"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
