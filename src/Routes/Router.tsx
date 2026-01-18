import { createBrowserRouter } from "react-router";
import DsahboardLayout from "../Layouts/DsahboardLayout";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "dashboard",
    Component: DsahboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
    ],
  },
]);
