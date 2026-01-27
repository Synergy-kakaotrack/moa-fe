'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext =
  createContext<SidebarContextValue | null>(null);

export function SidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarState() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      'useSidebarState must be used within SidebarProvider'
    );
  }

  return context;
}
