export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: any;
  color: string;
}> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon stroke="white" className={`w-6 h-6 }`} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);
