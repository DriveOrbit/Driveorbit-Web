"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  IconMenu2, 
  IconX,
  IconBell,
  IconUserCircle
} from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const Navbar = ({ 
  className 
}: { 
  className?: string 
}) => {
  const [notificationCount, setNotificationCount] = useState(3);
  
  return (
    <div className={cn("h-16 w-full bg-neutral-900 border-b border-neutral-800 flex items-center justify-end px-6", className)}>
      <div className="flex items-center gap-4">
        {/* Notification Bell with Alert */}
        <div className="relative">
          <IconBell className="h-6 w-6 text-neutral-300 cursor-pointer hover:text-neutral-100 transition-colors" />
          {notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </div>
          )}
        </div>
        
   
        
        {/* Register Button */}
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          Register
        </Link>
      </div>
    </div>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}:  React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full py-8 hidden md:flex md:flex-col bg-neutral-900 border-r border-neutral-800 w-[280px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "280px" : "80px") : "280px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {/* Driveorbit logo*/}
        <div className="px-4 pb-6 flex items-center gap-2">
          <Image src="/logo.png" alt="DriveOrBit Logo" width={40} height={40} className="h-10 w-auto" />
          {open && (
            <motion.span
              animate={{
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-xl font-bold text-neutral-200"
            >
              DriveOrBit
            </motion.span>
          )}
        </div>
        
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const [notificationCount, setNotificationCount] = useState(3);
  
  return (
    <>
      <div
        className={cn(
          "h-16 px-6 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-900 border-b border-neutral-800 w-full flex-shrink-0"
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <IconMenu2
            className="text-neutral-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center gap-4">
          {/* Notification Bell with Alert */}
          <div className="relative">
            <IconBell className="h-6 w-6 text-neutral-300 cursor-pointer hover:text-neutral-100 transition-colors" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </div>
          
         
          
          {/* Register Button */}
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Register
          </Link>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-neutral-900 p-8 z-[100] flex flex-col",
                className
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <IconX
                  className="text-neutral-200 cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="DriveOrBit Logo" width={40} height={40} className="h-10 w-auto" />
                  <span className="text-xl font-bold text-neutral-200">
                    DriveOrBit
                  </span>
                </div>
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  active = false,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 py-3 hover:bg-neutral-800 rounded-lg px-4 transition-colors duration-150",
        active ? "bg-neutral-800 text-blue-400" : "text-neutral-300",
        !open ? "justify-center" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className={cn(
        "flex-shrink-0",
        active ? "text-blue-400" : "text-neutral-300"
      )}>
        {link.icon}
      </div>

      <motion.span
        style={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? "auto" : "0") : "auto",
        } as React.CSSProperties}
        className={cn(
          "text-sm whitespace-pre group-hover/sidebar:translate-x-1 transition duration-150",
          active ? "text-blue-400" : "text-neutral-300"
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const SidebarSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const { open } = useSidebar();
  
  return (
    <div className="flex flex-col gap-3 px-3">
      {title && open && (
        <span className="text-xs font-semibold text-neutral-400 px-1 mt-6 mb-1">
          {title}
        </span>
      )}
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};