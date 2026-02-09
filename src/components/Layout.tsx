"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ServiceProvider } from "@/context/ServiceContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <ServiceProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className={isMobile ? "flex-1 pb-20" : "flex-1 ml-16"}>
          {children}
        </main>
      </div>
    </ServiceProvider>
  );
};

export default Layout;