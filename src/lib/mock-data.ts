import { Vehicle } from '@/lib/types/fleet';
import { Driver } from '@/lib/types/driver';

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
    maintenanceLogs: [
      {
        id: '3-1',
        date: '2024-03-10',
        type: 'Part Replacement',
        description: 'Brake system replacement',
        nextDueDate: '2024-03-15',
        cost: 1200,
        partDetails: {
          name: 'Brake System',
          serialNumber: 'BRK-2024-001',
          warranty: '2 years'
        }
      }
    ]
  },
  {
    id: '4',
    name: 'BMW 7 Series',
    model: '2024',
    type: 'Sedan',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1523983254932-c7e6571c9d60',
    features: ['Executive Package', 'Massage Seats', 'Night Vision'],
    capacity: 5,
    fuelType: 'Hybrid',
    licensePlate: 'LUX-2024',
    lastMaintenance: '2024-01-20',
    maintenanceLogs: [
      {
        id: '4-1',
        date: '2024-01-20',
        type: 'Regular Service',
        description: 'Scheduled maintenance and software update',
        nextDueDate: '2024-07-20'
      }
    ]
  },
  {
    id: '5',
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
    maintenanceLogs: [
      {
        id: '5-1',
        date: '2024-02-28',
        type: 'Regular Service',
        description: 'Battery system check',
        nextDueDate: '2024-08-28'
      }
    ]
  },
  {
    id: '6',
    name: 'Toyota Sienna',
    model: '2024',
    type: 'Van',
    status: 'Maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09',
    features: ['Hybrid', 'Family Package', 'Entertainment System'],
    capacity: 8,
    fuelType: 'Hybrid',
    licensePlate: 'VAN-2024',
    lastMaintenance: '2024-03-05',
    maintenanceLogs: [
      {
        id: '6-1',
        date: '2024-03-05',
        type: 'Part Replacement',
        description: 'Hybrid battery replacement',
        nextDueDate: '2024-03-20',
        cost: 3500,
        partDetails: {
          name: 'Hybrid Battery Pack',
          serialNumber: 'HBP-2024-002',
          warranty: '8 years'
        }
      }
    ]
  },
  {
    id: '7',
    name: 'Porsche Taycan',
    model: '2024',
    type: 'Sedan',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16',
    features: ['Performance Package', 'Electric', 'Premium Audio'],
    capacity: 4,
    fuelType: 'Electric',
    licensePlate: 'SPT-2024',
    lastMaintenance: '2024-02-10',
    maintenanceLogs: [
      {
        id: '7-1',
        date: '2024-02-10',
        type: 'Echo Test',
        description: 'Electric system certification',
        nextDueDate: '2025-02-10'
      }
    ]
  },
  {
    id: '8',
    name: 'Mercedes EQS SUV',
    model: '2024',
    type: 'SUV',
    status: 'Maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1669739432571-aee1f057c41f',
    features: ['Luxury Package', 'Electric', 'Hyperscreen'],
    capacity: 7,
    fuelType: 'Electric',
    licensePlate: 'EQS-2024',
    lastMaintenance: '2024-03-12',
    maintenanceLogs: [
      {
        id: '8-1',
        date: '2024-03-12',
        type: 'Part Replacement',
        description: 'Air suspension system repair',
        nextDueDate: '2024-03-22',
        cost: 2800,
        partDetails: {
          name: 'Air Suspension Module',
          serialNumber: 'ASM-2024-003',
          warranty: '2 years'
        }
      }
    ]
  },
  {
    id: '9',
    name: 'Rivian R1S',
    model: '2024',
    type: 'SUV',
    status: 'In Use',
    imageUrl: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c',
    features: ['Adventure Package', 'Electric', 'Off-road Capability'],
    capacity: 7,
    fuelType: 'Electric',
    licensePlate: 'RVN-2024',
    lastMaintenance: '2024-02-20',
    maintenanceLogs: [
      {
        id: '9-1',
        date: '2024-02-20',
        type: 'Regular Service',
        description: 'Off-road system check',
        nextDueDate: '2024-08-20'
      }
    ]
  },
  {
    id: '10',
    name: 'Volvo XC90',
    model: '2024',
    type: 'SUV',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c',
    features: ['Safety Package', 'Hybrid', 'Premium Sound'],
    capacity: 7,
    fuelType: 'Hybrid',
    licensePlate: 'VOL-2024',
    lastMaintenance: '2024-01-15',
    maintenanceLogs: [
      {
        id: '10-1',
        date: '2024-01-15',
        type: 'License Renewal',
        description: 'Annual registration renewal',
        nextDueDate: '2025-01-15'
      },
      {
        id: '10-2',
        date: '2024-01-15',
        type: 'Echo Test',
        description: 'Emissions certification',
        nextDueDate: '2025-01-15'
      }
    ]
  }
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    fullName: 'Chandeera Wickramasingha',
    nic: '123456789V',
    address: '123 Oak St, City',
    phoneNumber: '123-456-7890',
    dateOfBirth: '1990-01-01',
    email: '123@gmail.com',
    emergencyContact: '098-765-4321',
    emergencyContactName: 'Samantha Wickramasingha',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'password',
    photoUrl: '/images/drivers/driver1.jpg',
  },
  {
    id: '2',
    fullName: 'Sachintha Sithuruwan',
    nic: '234567890V',
    address: '456 Elm St, Town',
    phoneNumber: '234-567-8901',
    dateOfBirth: '1995-02-02',
    email: '456@gmail.com',
    emergencyContact: '987-654-3210',
    emergencyContactName: 'Supuni Sashikala',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'Amathithuma',
    photoUrl: '/images/drivers/driver2.jpg',
  },
  {
    id: '3',
    fullName: 'Senuka Fernando',
    nic: '345678901V',
    address: '789 Pine St, Village',
    phoneNumber: '345-678-9012',
    dateOfBirth: '1992-03-03',
    email: '528@gmail.com',
    emergencyContact: '876-543-2109',
    emergencyContactName: 'Ujesha Vidarshani',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'password',
    photoUrl: '/images/drivers/driver3.jpg',
  },
  {
    id: '4',
    fullName: 'Chamikara Kodithuwakku',
    nic: '345678901V',
    address: '789 Pine St, Village',
    phoneNumber: '345-678-9012',
    dateOfBirth: '1992-03-03',
    email: '528@gmail.com',
    emergencyContact: '876-543-2109',
    emergencyContactName: 'Meenakshi Kodithuwakku',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'password',
    photoUrl: '/images/drivers/driver4.jpg',
  },
  {
    id: '5',
    fullName: 'Nuhansa De Silva',
    nic: '345678901V',
    address: '789 Pine St, Village',
    phoneNumber: '345-678-9012',
    dateOfBirth: '1992-03-03',
    email: '528@gmail.com',
    emergencyContact: '876-543-2109',
    emergencyContactName: 'Dhanushka De Silva',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'password',
    photoUrl: '/images/drivers/driver5.jpg',
  },
  {
    id: '6',
    fullName: 'Duranga Harindi',
    nic: '345678901V',
    address: '789 Pine St, Village',
    phoneNumber: '345-678-9012',
    dateOfBirth: '1992-03-03',
    email: '528@gmail.com',
    emergencyContact: '876-543-2109',
    emergencyContactName: 'Anjana Harinda',
    emergencyContactRelation: 'Spouse',
    licenseExpireDate: '2025-01-01',
    licenseIssueDate: '2020-01-01',
    licenseNumber: 'DL-2020-123',
    licenseType: 'Class D',
    password: 'password',
    photoUrl: '/images/drivers/driver6.jpg',
  },
];