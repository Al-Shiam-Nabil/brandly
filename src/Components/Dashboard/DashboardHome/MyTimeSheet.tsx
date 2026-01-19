import { Calendar, ChevronRight, Timer, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailyStats = [
  { date: "Oct 16", hours: 4.5 },
  { date: "Oct 17", hours: 6.2 },
  { date: "Oct 18", hours: 5.8 },
  { date: "Oct 19", hours: 8.4 },
  { date: "Oct 20", hours: 7.1 },
  { date: "Oct 21", hours: 3.2 },
  { date: "Oct 22", hours: 4.8 },
  { date: "Oct 23", hours: 9.5 },
  { date: "Oct 24", hours: 7.8 },
  { date: "Oct 25", hours: 6.5 },
];

export default function MyTimeSheet() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 h-[570px] w-full flex flex-col transition-all hover:shadow-md">
      {/* Header with quick stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
            <Timer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              My Timesheets
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Last 10 Days Trend
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Avg. Daily
            </p>
            <p className="text-xl font-black text-slate-900">6.4h</p>
          </div>
          <div className="h-10 w-px bg-slate-100"></div>
          <div className="text-right">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter flex items-center justify-end gap-1">
              <TrendingUp className="w-3 h-3" /> Growth
            </p>
            <p className="text-xl font-black text-slate-900">+14%</p>
          </div>
        </div>
      </div>

      {/* Main Line Chart */}
      <div className="flex-1 min-h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dailyStats}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            {/* Standard SVG tags are used within Recharts components */}
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#e2e8f0",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#4f46e5"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorHours)"
              dot={{ fill: "#4f46e5", strokeWidth: 2, r: 4, stroke: "#fff" }}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#4f46e5" }}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 pt-6 border-t border-slate-50 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing time activity from{" "}
          <span className="font-bold text-slate-900">Oct 16</span> to{" "}
          <span className="font-bold text-slate-900">Oct 25</span>
        </p>
        <button className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Download PDF Report <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-white">
            {payload[0].value}
          </span>
          <span className="text-xs font-bold text-indigo-400">hours spent</span>
        </div>
      </div>
    );
  }
  return null;
};
