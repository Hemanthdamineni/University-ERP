"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMode = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        isAdvancedMode={isAdvancedMode}
        onToggleMode={toggleMode}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
