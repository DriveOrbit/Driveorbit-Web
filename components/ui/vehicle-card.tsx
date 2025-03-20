'use client';

import { Vehicle } from '@/types/fleet';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car, Users, Fuel } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card 
        className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow bg-card"
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
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-xl text-foreground">{vehicle.name}</h3>
            <Badge variant="secondary">{vehicle.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{vehicle.model}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">{vehicle.capacity} seats</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Fuel className="h-4 w-4" />
              <span className="text-sm">{vehicle.fuelType}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}