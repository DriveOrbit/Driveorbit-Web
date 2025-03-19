"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarSection } from "@/components/ui/sidebar";
import {
  IconDashboard,
  IconCar,
  IconUsersGroup,
  IconMail,
  IconMessage,
  IconPhone,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import RealTimeMap from "@/components/ui/RealTimeMap";
import VehicleList from "@/components/ui/VehicleList";

export function SidebarDemo() {
  const [activeSection, setActiveSection] = useState<string | null>("dashboard");

  return (
    <div
      className={cn(
        "h-screen w-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800"
      )}
    >
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "Dashboard",
                  href: "#",
                  icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
                onClick={() => setActiveSection("dashboard")}
              />
              <SidebarLink
                link={{
                  label: "Vehicles",
                  href: "/vehicles",
                  icon: <IconCar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
              />
              <SidebarLink
                link={{
                  label: "Drivers",
                  href: "/drivers",
                  icon: <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
              />
              <SidebarSection title="CHAT SECTION">
                <SidebarLink
                  link={{
                    label: "Emails",
                    href: "/emails",
                    icon: <IconMail className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                />
                <SidebarLink
                  link={{
                    label: "Chats",
                    href: "/chats",
                    icon: <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                />
                <SidebarLink
                  link={{
                    label: "Calls",
                    href: "/calls",
                    icon: <IconPhone className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                />
              </SidebarSection>
              <SidebarSection title="OTHERS">
                <SidebarLink
                  link={{
                    label: "Settings",
                    href: "/settings",
                    icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                />
                <SidebarLink
                  link={{
                    label: "Account",
                    href: "/account",
                    icon: <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                />
              </SidebarSection>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === "dashboard" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            
            {/* Side-by-side layout for map and vehicles */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map takes up 2/3 of the space on larger screens */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow h-full">
                  <h2 className="text-lg font-semibold mb-2">Real-Time Vehicle Tracking</h2>
                  <div className="h-[500px]">
                    <RealTimeMap />
                  </div>
                </div>
              </div>
              
              {/* Vehicles list takes up 1/3 of the space */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow h-full">
                  <VehicleList />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Logo Component (unchanged)
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
      </motion.span>
    </Link>
  );
};

// LogoIcon Component (unchanged)
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Default Export for the Page
export default function Page() {
  return (
    <div>
      <SidebarDemo />
    </div>
  );
}