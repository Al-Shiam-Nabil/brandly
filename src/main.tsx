import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { SidebarProvider } from "./Context/DashboardContext";
import "./i18n";
import "./index.css";
import { router } from "./Routes/Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
);
