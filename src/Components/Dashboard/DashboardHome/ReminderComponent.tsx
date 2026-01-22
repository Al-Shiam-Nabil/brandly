import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Reminder } from "../../../types";

interface CRMWidgetsProps {
  todayCount: number;
  upcomingCount: number;
  nextReminder: Reminder;
}

export const ReminderComponent: React.FC<CRMWidgetsProps> = ({
  todayCount,
  upcomingCount,
}) => {
  const { t } = useTranslation("reminder");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6  border border-slate-100 w-full">
      {/* Reminder Today Stat */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-110 transition-transform"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 text-sm font-semibold uppercase">
            {t("reminders.todays_reminders")}
          </p>
          <h3 className="text-4xl font-black text-slate-900 mt-1">
            {todayCount}
          </h3>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t("reminders.completed")}</span>
          </div>
        </div>
      </div>

      {/* Upcoming Reminders Stat */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-110 transition-transform"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-200">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 text-sm font-semibold uppercase ">
            {t("reminders.upcoming_total")}
          </p>
          <h3 className="text-4xl font-black text-slate-900 mt-1">
            {upcomingCount}
          </h3>
          <p className="text-slate-500 text-sm font-medium mt-2 italic">
            {t("reminders.next_7_days")}
          </p>
        </div>
      </div>
    </div>
  );
};
