"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  Settings,
  Stethoscope,
  DollarSign,
  FileText,
  MessageSquare,
  UsersRound,
  BookOpen,
  BarChart3,
  Clipboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    name: "Calendar",
    icon: Calendar,
    path: "/calendar",
  },
  {
    name: "Clients",
    icon: Users,
    path: "/clients",
  },
  {
    name: "Providers",
    icon: Stethoscope,
    path: "/providers",
  },
  {
    name: "Services",
    icon: Clipboard,
    path: "/services",
  },
  {
    name: "Messaging",
    icon: MessageSquare,
    path: "/messaging",
  },
  {
    name: "Group Sessions",
    icon: UsersRound,
    path: "/group-sessions",
  },
  {
    name: "Programs",
    icon: BookOpen,
    path: "/programs",
  },
  {
    name: "Charting",
    icon: FileText,
    path: "/charting",
  },
  {
    name: "Billing",
    icon: DollarSign,
    path: "/billing",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    const primaryItems = navItems.slice(0, 5);
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border z-50 flex justify-around p-2">
        {primaryItems.map((item) => (
          <Link key={item.name} to={item.path} className="flex-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex flex-col items-center justify-center h-auto py-1 px-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-16 flex-col border-r bg-sidebar sm:flex">
      <ScrollArea className="flex-1">
        <nav className="flex flex-col items-center gap-3 px-2 py-5">
          {navItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                    location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
