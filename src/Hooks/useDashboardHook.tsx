import { useContext } from "react";
import { DashboardContext } from "../Context/DashboardContext";

export default function useDashboardHook() {
  const data = useContext(DashboardContext);

  if (!data) {
    throw new Error("useSidebar must be used inside SidebarContextProvider");
  }

  return data;
}
