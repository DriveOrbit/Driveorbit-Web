'use client';

import { Vehicle } from '@/lib/types/fleet';

import { Card } from './card';
import { Separator } from './separator';
import { format } from 'date-fns';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{vehicle.name}</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          Back to List
        </button>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">1. Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">License Plate</p>
            <p className="font-medium">{vehicle.licensePlate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">VIN</p>
            <p className="font-medium">{vehicle.vin}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Model</p>
            <p className="font-medium">{vehicle.model}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Brand</p>
            <p className="font-medium">{vehicle.brand}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Year of Manufacture</p>
            <p className="font-medium">{vehicle.yearOfManufacture}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Vehicle Type</p>
            <p className="font-medium">{vehicle.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fuel Type</p>
            <p className="font-medium">{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Engine Capacity</p>
            <p className="font-medium">{vehicle.engineCapacity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Chassis Number</p>
            <p className="font-medium">{vehicle.chassisNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Color</p>
            <p className="font-medium">{vehicle.color}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">2. Insurance & Legal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Insurance Provider</p>
            <p className="font-medium">{vehicle.insurance.provider}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Policy Number</p>
            <p className="font-medium">{vehicle.insurance.policyNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Insurance Expiry</p>
            <p className="font-medium">
              {format(new Date(vehicle.insurance.expiryDate), 'PPP')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Registration Certificate</p>
            <p className="font-medium">{vehicle.registrationCertificate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Emission Test Expiry</p>
            <p className="font-medium">
              {vehicle.emissionTestExpiry === 'N/A' 
                ? 'N/A' 
                : format(new Date(vehicle.emissionTestExpiry), 'PPP')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Road Tax Expiry</p>
            <p className="font-medium">
              {format(new Date(vehicle.roadTaxExpiry), 'PPP')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}