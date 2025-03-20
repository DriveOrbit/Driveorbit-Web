'use client';

import { Vehicle } from '@/types/fleet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Calendar, Car, Fuel, FileText, Users } from 'lucide-react';

interface VehicleDialogProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleDialog({ vehicle, open, onOpenChange }: VehicleDialogProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{vehicle.name}</DialogTitle>
        </DialogHeader>
        <div className="relative h-64 w-full mt-4">
          <Image
            src={vehicle.imageUrl}
            alt={vehicle.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="grid gap-4 mt-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-lg">
              {vehicle.type}
            </Badge>
            <Badge variant="secondary" className="text-lg">
              {vehicle.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-foreground">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <span>Model: {vehicle.model}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>Capacity: {vehicle.capacity} seats</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-muted-foreground" />
              <span>Fuel: {vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span>License: {vehicle.licensePlate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-foreground">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>Last Maintenance: {vehicle.lastMaintenance}</span>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-foreground">Features:</h4>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}