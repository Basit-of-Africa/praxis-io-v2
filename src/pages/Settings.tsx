"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings2,
  Palette,
  Plug,
  Zap,
  FileText,
  ClipboardList,
  User,
  Shield,
  Bell,
} from "lucide-react";

const settingsCategories = [
  {
    title: "Practice Settings",
    description: "Branding, integrations, automations, templates, and protocols",
    icon: Settings2,
    path: "/practice-settings",
    color: "text-blue-500",
  },
  {
    title: "User Profile",
    description: "Update your personal information and credentials",
    icon: User,
    path: "#",
    color: "text-green-500",
  },
  {
    title: "Notifications",
    description: "Manage email and SMS notification preferences",
    icon: Bell,
    path: "#",
    color: "text-yellow-500",
  },
  {
    title: "Security & Privacy",
    description: "Password, two-factor authentication, and privacy settings",
    icon: Shield,
    path: "#",
    color: "text-red-500",
  },
];

const Settings = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <Link to={category.path}>
                <Button variant="outline" className="w-full">
                  Configure
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/practice-settings">
                  <Palette className="mr-2 h-4 w-4" />
                  Customize Branding
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/practice-settings">
                  <Plug className="mr-2 h-4 w-4" />
                  Manage Integrations
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/practice-settings">
                  <Zap className="mr-2 h-4 w-4" />
                  Setup Automations
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;