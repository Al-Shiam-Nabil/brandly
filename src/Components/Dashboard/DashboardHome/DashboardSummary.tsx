import { Briefcase, Calendar, CheckSquare, MessageSquare } from "lucide-react";
import { StatCard } from "./StatCard";

export default function () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="My open tasks"
        value="128"
        icon={CheckSquare}
        color="bg-indigo-600"
      />
      <StatCard
        title="Today's Events"
        value="4"
        icon={Calendar}
        color="bg-violet-600"
      />
      <StatCard
        title="New Posts"
        value="12"
        icon={MessageSquare}
        color="bg-emerald-600"
      />
      <StatCard
        title="Active Projects"
        value="8"
        icon={Briefcase}
        color="bg-blue-600"
      />
    </div>
  );
}
