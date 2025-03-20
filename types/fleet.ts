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
}

export interface FleetResponse {
  vehicles: Vehicle[];
  total: number;
}