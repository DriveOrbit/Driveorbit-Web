'use client';

import { useState } from 'react';
import { Vehicle, MaintenanceLog as MaintenanceLogType } from'@/lib/types/fleet';
import { mockDrivers, mockVehicles } from '@/lib/mock-data';
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
  IconAlertTriangle
} from "@tabler/icons-react";
import RealTimeMap from "@/components/ui/RealTimeMap";
import VehicleList from "@/components/ui/VehicleList";
import { Button } from '@/components/ui/button';
import { DriverCard } from '@/components/ui/DriverCard';
import { DriverDialog } from '@/components/ui/DriverDialog';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'fleet' | 'registered' | 'maintenance' | 'dashboard' | 'vehicles' | 'drivers' | 'settings' | 'account' | 'service' | 'issues'>('overview');
  const [driverDialogOpen, setDriverDialogOpen] = useState(false);
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

      case 'fleet':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Car className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Today's Fleet</h1>
              </div>
              <button
                onClick={() => setActiveSection('overview')}
                className="text-sm text-primary hover:text-primary/80"
              >
                Back to Overview
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={setSelectedVehicle}
                />
              ))}
            </div>
          </motion.div>
        );

      case 'vehicles':
      case 'registered':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Registered Vehicles
                </h1>
              </div>
              {activeSection === 'registered' && (
                <button
                  onClick={() => setActiveSection('overview')}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Back to Overview
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={setSelectedVehicle}
                />
              ))}
            </div>
          </motion.div>
        );

      case 'service':
      case 'maintenance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Wrench className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Maintenance Logs
                </h1>
              </div>
              {activeSection === 'maintenance' && (
                <button
                  onClick={() => setActiveSection('overview')}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Back to Overview
                </button>
              )}
            </div>

            <div className="space-y-8">
              {mockVehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{vehicle.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === 'Maintenance' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  
                  <div className="grid gap-4">
                    {vehicle.maintenanceLogs.map((log: MaintenanceLogType) => (
                      <MaintenanceLog key={log.id} log={log} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
        
        case 'drivers':
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Drivers Management</h1>
                <Button onClick={() => setDriverDialogOpen(true)}>Register Driver</Button>
              </div>
        
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockDrivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} />
                ))}
              </div>
        
              <DriverDialog
                open={driverDialogOpen}
                onOpenChange={setDriverDialogOpen}
                onSave={(newDriver: any) => {
                  // Add logic to save the new driver (e.g., API call or state update)
                  console.log('New Driver:', newDriver);
                }}
              />
            </motion.div>
          );
        
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Settings
            </h1>
            <p>Settings content will be displayed here.</p>
          </motion.div>
        );
        
      case 'account':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Account Management
            </h1>
            <p>Account management content will be displayed here.</p>
          </motion.div>
        );
        
      case 'issues':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
              Vehicle Issues
            </h1>
            <p>Vehicle issues and alerts will be displayed here.</p>
          </motion.div>
        );
        
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

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
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
  );
}
