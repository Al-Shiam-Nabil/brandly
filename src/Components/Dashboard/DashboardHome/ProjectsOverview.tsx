import { Briefcase, Lock, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

/* ---------- Component ---------- */
export default function ProjectsOverview() {
  const { t } = useTranslation("projectsOverview");

  const projectData = [
    {
      name: t("projects.active.name"),
      value: 12,
      color: "#4f46e5",
    },
    {
      name: t("projects.on_hold.name"),
      value: 10,
      color: "#f59e0b",
    },
    {
      name: t("projects.completed.name"),
      value: 5,
      color: "#10b981",
    },
  ];

  const totalProjects = projectData.reduce((sum, item) => sum + item.value, 0);

  /* ---------- Simple Tooltip ---------- */
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const { name, value, color } = payload[0].payload;

    return (
      <div className="bg-white px-3 py-2 rounded-md border shadow-sm text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium text-slate-800">{name}</span>
        </div>
        <div className="text-slate-600">Projects: {value}</div>
      </div>
    );
  };

  /* ---------- Pie Label ---------- */
  const renderLabel = ({ name, percent }: { name: string; percent: number }) =>
    `${name} ${(percent * 100).toFixed(0)}%`;

  return (
    <div className="bg-white p-6 w-full rounded-xl shadow-sm border border-slate-100">
      <SectionHeader title={t("projectsOverview")} icon={Briefcase} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Chart */}
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={renderLabel}
                labelLine={false}
              >
                {projectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              {/* Center Text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="50%"
                  dy="-4"
                  className="fill-slate-900 text-xl font-bold"
                >
                  {totalProjects}
                </tspan>
                <tspan x="50%" dy="18" className="fill-slate-500 text-xs">
                  {t("total_projects")}
                </tspan>
              </text>

              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                isAnimationActive={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
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
                />
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

/* ---------- Section Header ---------- */
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
