import { createBrowserRouter } from "react-router";
import DsahboardLayout from "../Layouts/DsahboardLayout";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import EventsPage from "../Pages/EventsPage/EventsPage";
import FilesPage from "../Pages/Files/FilesPage";
import LeavePage from "../Pages/Leave/LeavePage";
import NotesPage from "../Pages/Notes/NotesPage";
import ProjectsPage from "../Pages/Projects/ProjectsPage";
import ReportsPage from "../Pages/Reports/ReportsPage";
import Taskspage from "../Pages/Tasks/Taskspage";
import TeamMembers from "../Pages/TeamMembers/TeamMembers";
import TodosPage from "../Pages/Todos/TodosPage";

export const router = createBrowserRouter([
  {
    path: "dashboard",
    Component: DsahboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "todos",
        Component: TodosPage,
      },
      {
        path: "events",
        Component: EventsPage,
      },
      {
        path: "projects",
        Component: ProjectsPage,
      },
      {
        path: "tasks",
        Component: Taskspage,
      },
      {
        path: "notes",
        Component: NotesPage,
      },
      {
        path: "reports",
        Component: ReportsPage,
      },
      {
        path: "files",
        Component: FilesPage,
      },
      {
        path: "team-members",
        Component: TeamMembers,
      },
      {
        path: "leave",
        Component: LeavePage,
      },
    ],
  },
]);
