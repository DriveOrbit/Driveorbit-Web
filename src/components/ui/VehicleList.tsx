"use client";

import React, { useState } from 'react';
import { IconTruck, IconAlertTriangle, IconInfoCircle, IconMap, IconRoute } from '@tabler/icons-react';

interface Vehicle {
  id: string;
  status: 'active' | 'warning' | 'error';
  time: string;
  driver?: string;
  location?: string;
}

const vehicles: Vehicle[] = [
  { id: 'CR 1565', status: 'active', time: '1h 15min', driver: 'Michael Smith', location: 'Downtown' },
  { id: 'PN 8719', status: 'active', time: '1h 15min', driver: 'Sarah Johnson', location: 'North Highway' },
  { id: 'DL 6389', status: 'error', time: '1h 15min', driver: 'David Lee', location: 'East District' },
  { id: 'VB 4285', status: 'error', time: '1h 15min', driver: 'Emma Wilson', location: 'South Bridge' },
  { id: 'CR 8565', status: 'active', time: '1h 15min', driver: 'James Brown', location: 'West Avenue' },
];

const VehicleList = () => {
  
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Active Vehicles</h2>
        <div className="flex space-x-1">
          
          
        </div>
      </div>
      
      <div className="space-y-3 overflow-y-auto flex-grow">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className={`flex flex-col bg-neutral-800 rounded-lg transition-all duration-200 ${
              selectedVehicle === vehicle.id ? 'border-l-4 border-green-500' : ''
            }`}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  vehicle.status === 'active' ? 'bg-green-500' :
                  vehicle.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <IconTruck className="w-6 h-6 text-neutral-400" />
                <div>
                  <h3 className="text-white font-medium">{vehicle.id}</h3>
                  <p className="text-xs text-neutral-400">17 May, 20 / {vehicle.time}</p>
                </div>
              </div>
              

            </div>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default VehicleList;