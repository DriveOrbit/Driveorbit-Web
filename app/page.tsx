'use client';

import { useState } from 'react';
import { Vehicle } from '@/types/fleet';
import { mockVehicles } from '@/lib/mock-data';
import { VehicleCard } from '@/components/ui/vehicle-card';
import { VehicleDialog } from '@/components/ui/vehicle-dialog';
import { Car, ClipboardList, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeSection, setActiveSection] = useState<'fleet' | 'registered' | 'maintenance'>('fleet');
  
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

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {activeSection === 'fleet' ? (
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
                onClick={() => setActiveSection('fleet')}
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

            <VehicleDialog
              vehicle={selectedVehicle}
              open={!!selectedVehicle}
              onOpenChange={(open) => !open && setSelectedVehicle(null)}
            />
          </motion.div>
        ) : (
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
        )}
      </div>
    </main>
  );
}