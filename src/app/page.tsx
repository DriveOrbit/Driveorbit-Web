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
import Link, {LinkProps } from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import RealTimeMap from "@/components/ui/RealTimeMap"; // Import the RealTimeMap component

export function SidebarDemo() {
  const [activeSection, setActiveSection] = useState<string | null>("dashboard"); // Track active section

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
              {/*sidebar content here */}
            <SidebarLink
                  link={{
                    label: "Dashboard",
                    href: "#",
                    icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
                  onClick={() => setActiveSection("dashboard")} // set active section to dashboard
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
        {activeSection === "dashboard" && ( // Conditionally render the map
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Real-Time Map</h2>
              <RealTimeMap /> {/* Render the RealTimeMap component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Logo Component
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

// LogoIcon Component
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