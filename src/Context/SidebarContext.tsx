import { createContext, useState } from "react";

type SidebarType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

export const SidebarProvider = ({ children }: ChildrenType) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const value = {
    isOpen,
    setIsOpen,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
