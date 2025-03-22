'use client';



import { useState } from 'react';
import { Vehicle, MaintenanceLog as MaintenanceLogType } from '@/lib/types/fleet';
import { mockVehicles } from '@/lib/mock-data';
import { VehicleCard } from '@/components/ui/vehicle-card';
import { VehicleDialog } from '@/components/ui/vehicle-dialog';
import { MaintenanceLog } from '@/components/ui/maintenance-log';
import { Car, ClipboardList, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Sidebar, 
  SidebarBody, 
  SidebarLink, 
  SidebarSection 
} from "@/components/ui/sidebar";
import {
  IconDashboard,
  IconCar,
  IconUsersGroup,
  IconSettings,
  IconUser,
  IconTool,
  IconAlertTriangle,
  IconBell
} from "@tabler/icons-react";
import RealTimeMap from "@/components/ui/RealTimeMap";
import VehicleList from "@/components/ui/VehicleList";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationManager from '@/components/ui/notification-manager';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'fleet' | 'registered' | 'maintenance' | 'dashboard' | 'vehicles' | 'drivers' | 'settings' | 'account' | 'service' | 'issues' | 'notifications'>('dashboard'); // Changed to dashboard
  const [notificationCount, setNotificationCount] = useState(3);
  
  const availableVehicles = mockVehicles.filter(v => v.status === 'Available');
  const totalVehicles = mockVehicles.length;
  const maintenanceVehicles = mockVehicles.filter(v => v.status === 'Maintenance').length;

  const sections = [
    {
      id: 'fleet',
      title: "Today's Fleet",
      icon: Car,
      count: availableVehicles.length,
      description: 'Available vehicles ready for service'
    },
    {
      id: 'registered',
      title: 'Registered Vehicles',
      icon: ClipboardList,
      count: totalVehicles,
      description: 'Total vehicles in the system'
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      icon: Wrench,
      count: maintenanceVehicles,
      description: 'Vehicles under maintenance'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              
              {/* Notification and Register button */}
              <div className="flex items-center gap-4">
                {/* Notification Bell with Alert */}
                <div className="relative">
                  <IconBell className="h-6 w-6 text-neutral-600 dark:text-neutral-300 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors" />
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
          </motion.div>
        );

        




  case 'notifications':
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        Notification Center
      </h1>
      <NotificationManager />
    </motion.div>
  );

      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Fleet Management Overview
            </h1>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className="p-6 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setActiveSection(section.id as any)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-foreground">{section.count}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      // Other case statements remain the same
      // ...

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Content Not Found
            </h1>
            <p>The requested section could not be found.</p>
          </motion.div>
        );
    }
  };

  function setShowNotifications(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Visible on all screen sizes */}
      
        
          
        

      <div className="flex-1 flex md:flex-row overflow-hidden">
        {/* Sidebar */}
        <Sidebar>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
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
                    label: "Overview",
                    href: "#",
                    icon: <ClipboardList className="h-5 w-5" />,
                  }}
                  active={activeSection === "overview"}
                  onClick={() => setActiveSection("overview")}
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
    label: "Notifications",
    href: "#",
    icon: <IconBell className="h-5 w-5" />,
  }}
  active={activeSection === "notifications"}
  onClick={() => setActiveSection("notifications")}
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
              <div className="border-t border-neutral-800 mx-3 my-4"></div>
              
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
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
          
          <VehicleDialog
            vehicle={selectedVehicle}
            open={!!selectedVehicle}
            onOpenChange={(open) => !open && setSelectedVehicle(null)}
          />
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
  );
}

