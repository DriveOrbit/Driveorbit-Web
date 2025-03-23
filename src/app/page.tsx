'use client';

import { useState } from 'react';
import { Vehicle, MaintenanceLog as MaintenanceLogType } from '@/lib/types/fleet';
import { mockDrivers, mockVehicles } from '@/lib/mock-data';
import { VehicleCard } from '@/components/ui/vehicle-card';
import { VehicleDialog } from '@/components/ui/vehicle-dialog';
import { VehicleDetails } from '@/components/ui/vehicle-details';
import { MaintenanceLog } from '@/components/ui/maintenance-log';
import { Car, ClipboardList, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Driver } from '@/lib/types/driver';
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
import { Button } from '@/components/ui/button';
import { DriverCard } from '@/components/ui/DriverCard';
import { DriverDialog } from '@/components/ui/DriverDialog';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'fleet' | 'registered' | 'maintenance' | 'dashboard' | 'vehicles' | 'drivers' | 'settings' | 'account' | 'service' | 'issues' | 'notifications'>('dashboard');
  const [notificationCount, setNotificationCount] = useState(3);
  const [driverDialogOpen, setDriverDialogOpen] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  
  const availableVehicles = mockVehicles.filter(v => v.status === 'Available');
  const totalVehicles = mockVehicles.length;
  const maintenanceVehicles = mockVehicles.filter(v => v.status === 'Maintenance').length;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Driver[]>(mockDrivers);

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

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults(mockDrivers);
    } else {
      const results = mockDrivers.filter((driver) =>
        driver.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleDetails(true);
  };

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
              <div className="flex items-center gap-4">
                <div className="relative">
                  <IconBell className="h-6 w-6 text-neutral-600 dark:text-neutral-300 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors" />
                  {notificationCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </div>
                  )}
                </div>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Register
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow h-full">
                  <h2 className="text-lg font-semibold mb-2">Real-Time Vehicle Tracking</h2>
                  <div className="h-[500px]">
                    <RealTimeMap />
                  </div>
                </div>
              </div>
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
            <div className="mb-6 flex gap-2">
              <Input
                type="text"
                placeholder="Search by Driver ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/2"
              />
              <Button onClick={handleSearch}>Search</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults(mockDrivers);
                }}
              >
                Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.length > 0 ? (
                searchResults.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} />
                ))
              ) : (
                <div className="text-center text-muted-foreground py-6">
                  No drivers found.
                </div>
              )}
            </div>
            <DriverDialog
              open={driverDialogOpen}
              onOpenChange={setDriverDialogOpen}
              onSave={(newDriver) => {
                console.log('New Driver:', newDriver);
              }}
            />
          </motion.div>
        );

      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

      case 'registered':
        if (showVehicleDetails && selectedVehicle) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VehicleDetails
                vehicle={selectedVehicle}
                onClose={() => {
                  setShowVehicleDetails(false);
                  setSelectedVehicle(null);
                }}
              />
            </motion.div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Registered Vehicles
                </h1>
              </div>
              <button
                onClick={() => setActiveSection('overview')}
                className="text-sm text-primary hover:text-primary/80"
              >
                Back to Overview
              </button>
            </div>
            
            <Card className="p-6">
              <div className="space-y-4">
                {mockVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleVehicleClick(vehicle)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium">ID: {vehicle.id}</span>
                        <span className="text-sm text-muted-foreground">
                          {vehicle.brand} {vehicle.model}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">{vehicle.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        );

      case 'maintenance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Wrench className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Maintenance Logs
                </h1>
              </div>
              <button
                onClick={() => setActiveSection('overview')}
                className="text-sm text-primary hover:text-primary/80"
              >
                Back to Overview
              </button>
            </div>

            <div className="space-y-8">
              {mockVehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{vehicle.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${vehicle.status === 'Maintenance'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-primary/10 text-primary'
                      }`}>
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="grid gap-4">
                    {vehicle.maintenanceLogs.map((log) => (
                      <MaintenanceLog key={log.id} log={log} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
        <VehicleDialog
          vehicle={selectedVehicle}
          open={!!selectedVehicle && !showVehicleDetails}
          onOpenChange={(open) => !open && setSelectedVehicle(null)}
        />
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