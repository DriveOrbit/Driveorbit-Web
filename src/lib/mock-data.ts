import { Vehicle } from '@/lib/types/fleet';


export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model S',
    model: '2023',
    type: 'Sedan',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    features: ['Autopilot', 'Electric', 'Premium Sound'],
    capacity: 5,
    fuelType: 'Electric',
    licensePlate: 'EV-2023',
    lastMaintenance: '2024-03-01',
    vin: 'TSLA202301234567',
    brand: 'Tesla',
    yearOfManufacture: 2023,
    engineCapacity: 'N/A',
    chassisNumber: 'CHS202301234',
    color: 'Pearl White',
    insurance: {
      provider: 'EV Insurance Co',
      policyNumber: 'POL-123456',
      expiryDate: '2025-03-01'
    },
    emissionTestExpiry: 'N/A',
    roadTaxExpiry: '2025-01-15',
    registrationCertificate: 'RC-2023-001',
    maintenanceLogs: [
      {
        id: '1-1',
        date: '2024-03-01',
        type: 'Regular Service',
        description: 'Annual maintenance check',
        nextDueDate: '2025-03-01'
      },
      {
        id: '1-2',
        date: '2024-02-15',
        type: 'License Renewal',
        description: 'Vehicle registration renewal',
        nextDueDate: '2025-02-15'
      }
    ]
  },
  // ... (previous vehicles with added details)
  {
    id: '2',
    name: 'Range Rover Sport',
    model: '2024',
    type: 'SUV',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
    features: ['4x4', 'Leather Interior', 'Panoramic Roof'],
    capacity: 7,
    fuelType: 'Hybrid',
    licensePlate: 'SUV-2024',
    lastMaintenance: '2024-02-15',
    vin: 'RRS202401234567',
    brand: 'Land Rover',
    yearOfManufacture: 2024,
    engineCapacity: '3000',
    chassisNumber: 'CHS202402345',
    color: 'Santorini Black',
    insurance: {
      provider: 'Luxury Auto Insurance',
      policyNumber: 'POL-234567',
      expiryDate: '2025-02-15'
    },
    emissionTestExpiry: '2025-02-15',
    roadTaxExpiry: '2025-01-15',
    registrationCertificate: 'RC-2024-002',
    maintenanceLogs: [
      {
        id: '2-1',
        date: '2024-02-15',
        type: 'Echo Test',
        description: 'Emissions test completed',
        nextDueDate: '2025-02-15'
      }
    ]
  }
  // ... Add similar detailed information for other vehicles
];