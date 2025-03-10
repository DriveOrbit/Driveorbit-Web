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
  IconBrandTabler,
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "h-screen w-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {/* Add the sidebar content here */}
            <SidebarLink
                  link={{
                    label: "Dashboard",
                    href: "/dashbaord",
                    icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  }}
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

      {/* Dashboard Content */}
      <Dashboard />
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

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={`first-array-${index}`}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...Array(2)].map((_, index) => (
            <div
              key={`second-array-${index}`}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
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