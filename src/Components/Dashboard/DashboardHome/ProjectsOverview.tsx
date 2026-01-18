import { Briefcase, Lock, Plus } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const projectData = [
  { name: "Active", value: 12, color: "#4f46e5" },
  { name: "On Hold", value: 3, color: "#f59e0b" },
  { name: "Completed", value: 24, color: "#10b981" },
];

export default function ProjectsOverview() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionHeader title="Projects Overview" icon={Briefcase} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {projectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {projectData.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: p.color }}
                ></div>
                <span className="font-medium text-slate-700">{p.name}</span>
              </div>
              <span className="font-bold text-slate-900">{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SectionHeader: React.FC<{
  title: string;
  icon?: any;
  isPrivate?: boolean;
}> = ({ title, icon: Icon, isPrivate = false }) => (
  <div className="flex items-center justify-between mb-4 px-1">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {isPrivate && (
        <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-100">
          <Lock className="w-2.5 h-2.5" /> Private
        </span>
      )}
    </div>
    <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors">
      <Plus className="w-4 h-4" />
    </button>
  </div>
);
