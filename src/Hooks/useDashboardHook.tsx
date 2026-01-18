import { useContext } from "react";
import { SidebarContext } from "../Context/SidebarContext";

export default function useDashboardHook() {
  const data = useContext(SidebarContext);

  if (!data) {
    throw new Error("useSidebar must be used inside SidebarContextProvider");
  }

  return data;
}
