export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: any;
  color: string;
}> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon stroke="white" className={`w-7 h-7 }`} />
      </div>
      <div className="space-y-2">
        <p className="text-slate-500  font-semibold">{title}</p>
        <h3 className="text-xl font-bold text-slate-700">{value}</h3>
      </div>
    </div>
  );
};
