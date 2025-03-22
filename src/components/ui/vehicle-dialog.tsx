 'use client';

import { Vehicle } from '@/lib/types/fleet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import Image from 'next/image';

interface VehicleDialogProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleDialog({ vehicle, open, onOpenChange }: VehicleDialogProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{vehicle.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={vehicle.imageUrl}
              alt={vehicle.name}
              fill
              className="object-cover"
            />
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
              vehicle.status === 'Available' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
            }`}>
              {vehicle.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">License Plate</p>
              <p className="font-medium">{vehicle.licensePlate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{vehicle.yearOfManufacture}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{vehicle.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">{vehicle.fuelType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Maintenance</p>
              <p className="font-medium">{format(new Date(vehicle.lastMaintenance), 'PPP')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">{vehicle.capacity} passengers</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}