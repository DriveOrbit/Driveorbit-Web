"use client";
import React, { useState } from "react";
import { 
  Sidebar, 
  SidebarBody, 
  SidebarLink, 
  SidebarSection,
  Navbar 
} from "@/components/ui/sidebar";
import {
  IconDashboard,
  IconCar,
  IconUsersGroup,
  IconSettings,
  IconUser,
  IconTool,
  IconAlertTriangle
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SidebarDemo() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <div className="h-screen flex flex-col md:flex-row bg-neutral-950">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody className="justify-between">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Main Navigation */}
            <div className="mb-8 px-3">
              <SidebarLink
                link={{
                  label: "Dashboard",
                  href: "#",
                  icon: <IconDashboard className="h-5 w-5" />,
                }}
                active={activeSection === "dashboard"}
                onClick={() => setActiveSection("dashboard")}
                className="mb-2"
              />
              <SidebarLink
                link={{
                  label: "Vehicles",
                  href: "#",
                  icon: <IconCar className="h-5 w-5" />,
                }}
                active={activeSection === "vehicles"}
                onClick={() => setActiveSection("vehicles")}
                className="mb-2"
              />
              <SidebarLink
                link={{
                  label: "Drivers",
                  href: "#",
                  icon: <IconUsersGroup className="h-5 w-5" />,
                }}
                active={activeSection === "drivers"}
                onClick={() => setActiveSection("drivers")}
                className="mb-2"
              />
              <SidebarLink
                link={{
                  label: "Settings",
                  href: "#",
                  icon: <IconSettings className="h-5 w-5" />,
                }}
                active={activeSection === "settings"}
                onClick={() => setActiveSection("settings")}
                className="mb-2"
              />
              <SidebarLink
                link={{
                  label: "Account",
                  href: "#",
                  icon: <IconUser className="h-5 w-5" />,
                }}
                active={activeSection === "account"}
                onClick={() => setActiveSection("account")}
              />
            </div>
            
            {/* Maintenance Section with divider */}
            <div className="border-t border-neutral-800 mx-3 mb-4"></div>
            
            <div className="px-3">
              <SidebarLink
                link={{
                  label: "Service Schedule",
                  href: "#",
                  icon: <IconTool className="h-5 w-5" />,
                }}
                active={activeSection === "service"}
                onClick={() => setActiveSection("service")}
                className="mb-2"
              />
              <SidebarLink
                link={{
                  label: "Issues",
                  href: "#",
                  icon: <IconAlertTriangle className="h-5 w-5" />,
                }}
                active={activeSection === "issues"}
                onClick={() => setActiveSection("issues")}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-neutral-900 p-6">
        </div>
      </div>
    </div>
  );
}

// Default Export for the Page
export default function Page() {
  return <SidebarDemo />;
}
