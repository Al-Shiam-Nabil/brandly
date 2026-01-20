import DashboardSummary from "../../Components/Dashboard/DashboardHome/DashboardSummary";
import Events from "../../Components/Dashboard/DashboardHome/Events";
import MyTasks from "../../Components/Dashboard/DashboardHome/MyTasks";
import MyTimeSheet from "../../Components/Dashboard/DashboardHome/MyTimeSheet";
import ProjectsOverview from "../../Components/Dashboard/DashboardHome/ProjectsOverview";
import { ReminderComponent } from "../../Components/Dashboard/DashboardHome/ReminderComponent";
import Todo from "../../Components/Ui/Todo";
import type { Reminder } from "../../types";

export default function DashboardHome() {
  const MOCK_REMINDERS: Reminder[] = [
    {
      id: "1",
      title: "Strategy Call with Acme Corp",
      time: "10:30 AM",
      date: "2023-10-25",
      type: "Call",
      contactName: "Sarah Jenkins",
      priority: "High",
    },
    {
      id: "2",
      title: "Email Follow-up: Q4 Proposal",
      time: "1:00 PM",
      date: "2023-10-25",
      type: "Email",
      contactName: "Michael Chen",
      priority: "Medium",
    },
  ];

  return (
    <div className="space-y-8 ">
      <DashboardSummary />

      <div className=" grid grid-cols-12 gap-8">
        {/* left */}
        <div className=" col-span-full xl:col-span-7 space-x-8 space-y-8 ">
          <ProjectsOverview />
          <ReminderComponent
            todayCount={5}
            upcomingCount={18}
            nextReminder={MOCK_REMINDERS[0]}
          />

          <Events />
          <MyTasks />
        </div>

        {/* right */}
        <div className="col-span-full xl:col-span-5 space-y-8 space-x-8">
          <MyTimeSheet />
          <Todo />
        </div>
      </div>
    </div>
  );
}
