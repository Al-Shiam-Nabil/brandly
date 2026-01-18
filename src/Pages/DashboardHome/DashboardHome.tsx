import DashboardSummary from "../../Components/Dashboard/DashboardHome/DashboardSummary";
import ProjectsOverview from "../../Components/Dashboard/DashboardHome/ProjectsOverview";

export default function DashboardHome() {
  return (
    <div className="space-y-5">
      <DashboardSummary />

      <div className=" grid grid-cols-12 ">
        {/* left */}
        <div className="col-span-7 ">
          <ProjectsOverview />
        </div>

        {/* right */}
        <div className="col-span-5"></div>
      </div>
    </div>
  );
}
