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
  },
  {
    id: '3',
    name: 'Mercedes Sprinter',
    model: '2023',
    type: 'Van',
    status: 'Maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1632163930097-e1c99bf68e84',
    features: ['Cargo Space', 'Navigation', 'Backup Camera'],
    capacity: 12,
    fuelType: 'Diesel',
    licensePlate: 'VAN-2023',
    lastMaintenance: '2024-03-10',
    vin: 'MBVN202301234567',
    brand: 'Mercedes-Benz',
    yearOfManufacture: 2023,
    engineCapacity: '2200',
    chassisNumber: 'CHS202303456',
    color: 'Arctic White',
    insurance: {
      provider: 'Commercial Fleet Insurance',
      policyNumber: 'POL-345678',
      expiryDate: '2025-03-10'
    },
    emissionTestExpiry: '2025-03-10',
    roadTaxExpiry: '2025-02-28',
    registrationCertificate: 'RC-2023-003',
    maintenanceLogs: [
      {
        id: '3-1',
        date: '2024-03-10',
        type: 'Part Replacement',
        description: 'Brake system replacement',
        nextDueDate: '2024-03-15'
      }
    ]
  },
  {
    id: '4',
    name: 'Ford F-150 Lightning',
    model: '2024',
    type: 'Truck',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
    features: ['Electric', 'Extended Range', 'Pro Power Onboard'],
    capacity: 5,
    fuelType: 'Electric',
    licensePlate: 'TRK-2024',
    lastMaintenance: '2024-02-28',
    vin: 'FORD202401234567',
    brand: 'Ford',
    yearOfManufacture: 2024,
    engineCapacity: 'N/A',
    chassisNumber: 'CHS202404567',
    color: 'Antimatter Blue',
    insurance: {
      provider: 'EV Fleet Insurance',
      policyNumber: 'POL-456789',
      expiryDate: '2025-02-28'
    },
    emissionTestExpiry: 'N/A',
    roadTaxExpiry: '2025-02-28',
    registrationCertificate: 'RC-2024-004',
    maintenanceLogs: [
      {
        id: '4-1',
        date: '2024-02-28',
        type: 'Regular Service',
        description: 'Battery system check',
        nextDueDate: '2024-08-28'
      }
    ]
  },
  {
    id: '5',
    name: 'BMW iX',
    model: '2024',
    type: 'SUV',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1655412642160-3c11eadf4c32',
    features: ['Electric', 'Panoramic Sky Lounge', 'Driving Assistant Pro'],
    capacity: 5,
    fuelType: 'Electric',
    licensePlate: 'EV-2024',
    lastMaintenance: '2024-03-05',
    vin: 'BMW202401234567',
    brand: 'BMW',
    yearOfManufacture: 2024,
    engineCapacity: 'N/A',
    chassisNumber: 'CHS202405678',
    color: 'Mineral White',
    insurance: {
      provider: 'Premium Auto Insurance',
      policyNumber: 'POL-567890',
      expiryDate: '2025-03-05'
    },
    emissionTestExpiry: 'N/A',
    roadTaxExpiry: '2025-03-05',
    registrationCertificate: 'RC-2024-005',
    maintenanceLogs: [
      {
        id: '5-1',
        date: '2024-03-05',
        type: 'Regular Service',
        description: 'Software update and system check',
        nextDueDate: '2024-09-05'
      }
    ]
  }
];