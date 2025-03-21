'use client';

import { Vehicle } from '@/lib/types/fleet';
import { Card } from './card';
import Image from 'next/image';
import { Calendar, Users } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={() => onClick(vehicle)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{vehicle.name}</h3>
        <p className="text-sm text-muted-foreground">{vehicle.model}</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{vehicle.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(vehicle.lastMaintenance).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}