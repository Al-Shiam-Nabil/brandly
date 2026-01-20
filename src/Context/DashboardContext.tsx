import { createContext, useEffect, useState } from "react";

type SidebarType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DashboardContext = createContext<SidebarType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

export const SidebarProvider = ({ children }: ChildrenType) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth <= 600,
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const value = {
    isOpen,
    setIsOpen,
    isMobile,
    setIsMobile,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
