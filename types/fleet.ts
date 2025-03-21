export interface MaintenanceLog {
  id: string;
  date: string;
  type: 'License Renewal' | 'Echo Test' | 'Part Replacement' | 'Regular Service';
  description: string;
  nextDueDate: string;
  cost?: number;
  partDetails?: {
    name: string;
    serialNumber?: string;
    warranty?: string;
  };
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: 'SUV' | 'Sedan' | 'Van' | 'Truck';
  status: 'Available' | 'In Use' | 'Maintenance';
  imageUrl: string;
  features: string[];
  capacity: number;
  fuelType: string;
  licensePlate: string;
  lastMaintenance: string;
  maintenanceLogs: MaintenanceLog[];
}

export interface FleetResponse {
  vehicles: Vehicle[];
  total: number;
}