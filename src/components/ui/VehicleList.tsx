"use client";

import React, { useState, useEffect } from 'react';
import { IconTruck, IconMap, IconRoute } from '@tabler/icons-react';
import mockData from '@/lib/types/vehicledata';

interface Vehicle {
  id: string;
  status: 'active' | 'warning' | 'error';
  time?: string;
  driver: string;
  location?: string;
  position: {
    lat: number;
    lng: number;
  };
  fuelConsumption?: string;
  condition?: string;
  emergency?: string;
  isDriving?: boolean;
}

interface VehicleListProps {
  onVehicleSelect?: (id: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ onVehicleSelect = () => {} }) => {
  const [filter, setFilter] = useState<'ALL' | 'DRIVING' | 'PARKED'>('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockData.FIXED_VEHICLES); // Use fixed vehicles

  // Handles selection of a vehicle
  const handleVehicleClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId === selectedVehicle ? null : vehicleId);
    onVehicleSelect(vehicleId);
  };

  // Filters vehicles based on the selected filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === 'ALL') return true;
    if (filter === 'DRIVING') return vehicle.isDriving === true;
    if (filter === 'PARKED') return vehicle.isDriving === false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Active Vehicles</h2>
        <div className="flex space-x-1">
          {['ALL', 'DRIVING', 'PARKED'].map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filter === type ? 'bg-green-500/10 text-green-500' : 'hover:bg-neutral-800 text-neutral-400'
              }`}
              onClick={() => setFilter(type as 'ALL' | 'DRIVING' | 'PARKED')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto flex-grow">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`flex flex-col bg-neutral-800 rounded-lg transition-all duration-200 cursor-pointer hover:bg-neutral-750 ${
              selectedVehicle === vehicle.id ? 'border-l-4 border-green-500' : ''
            }`}
            onClick={() => handleVehicleClick(vehicle.id)}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    vehicle.status === 'active' ? 'bg-green-500' :
                    vehicle.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
                <IconTruck className="w-6 h-6 text-neutral-400" />
                <div>
                  <h3 className="text-white font-medium">{vehicle.id}</h3>
                  <p className="text-xs text-neutral-400">
                    {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })} / {vehicle.time || '0h 00min'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-2 py-1 rounded text-xs flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconMap className="w-3 h-3 mr-1" />
                  VIEW
                </button>
                <button
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-500 px-2 py-1 rounded text-xs flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconRoute className="w-3 h-3 mr-1" />
                  TRIP
                </button>
              </div>
            </div>

            {selectedVehicle === vehicle.id && (
              <div className="px-3 pb-3 pt-1 border-t border-neutral-700 text-xs text-neutral-300">
                <div className="flex justify-between mb-1">
                  <span>Driver:</span>
                  <span className="text-white">{vehicle.driver || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Location:</span>
                  <span className="text-white">{vehicle.location || 'Unknown'}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Condition:</span>
                  <span
                    className={`${
                      vehicle.status === 'active' ? 'text-green-500' :
                      vehicle.status === 'warning' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}
                  >
                    {vehicle.condition || 'Unknown'}
                  </span>
                </div>
                {vehicle.emergency && (
                  <div className="flex justify-between">
                    <span>Issue:</span>
                    <span className="text-red-500">{vehicle.emergency}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
