import { Briefcase, Calendar, CheckSquare, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";

export default function () {
  const { t } = useTranslation("dashboardStat");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title={t("stats.open_tasks.title")}
        value={t("stats.open_tasks.value")}
        icon={CheckSquare}
        color="bg-indigo-600"
      />
      <StatCard
        title={t("stats.todays_events.title")}
        value={t("stats.todays_events.value")}
        icon={Calendar}
        color="bg-violet-600"
      />
      <StatCard
        title={t("stats.new_posts.title")}
        value={t("stats.new_posts.value")}
        icon={MessageSquare}
        color="bg-emerald-600"
      />
      <StatCard
        title={t("stats.active_projects.title")}
        value={t("stats.active_projects.value")}
        icon={Briefcase}
        color="bg-blue-600"
      />
    </div>
  );
}
