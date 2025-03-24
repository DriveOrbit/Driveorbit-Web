'use client';

import { Vehicle } from '@/lib/types/fleet';
import { Card } from './card';
import Image from 'next/image';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onClick(vehicle)}
    >
      <div className="relative h-48">
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{vehicle.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.status === 'Available' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
          }`}>
            {vehicle.status}
          </span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>License Plate:</span>
            <span className="font-medium text-foreground">{vehicle.licensePlate}</span>
          </div>
          <div className="flex justify-between">
            <span>Year:</span>
            <span className="font-medium text-foreground">{vehicle.yearOfManufacture}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="font-medium text-foreground">{vehicle.type}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}