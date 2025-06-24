// Temporary simplified mock data until types are fully aligned
import { Vehicle } from '@/features/vehicles/types/fleet';
import { Driver } from '@/features/drivers/types/driver';

export const mockVehicles: Vehicle[] = [
    {
        id: '1',
        name: 'Tesla Model S',
        model: 'Model S',
        type: 'Sedan',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
        features: ['Autopilot', 'Supercharging', 'Premium Audio'],
        capacity: 5,
        fuelType: 'Electric',
        licensePlate: 'TSL-2023',
        lastMaintenance: '2024-01-15',
        maintenanceLogs: [
            {
                id: '1',
                date: '2024-01-15',
                type: 'Regular Service',
                description: 'Annual service completed',
                nextDueDate: '2025-01-15',
                cost: 500
            }
        ],
        vin: '5YJ3E1EA1FF012345',
        brand: 'Tesla',
        yearOfManufacture: 2023,
        engineCapacity: 'N/A (Electric)',
        chassisNumber: 'CH12345',
        color: 'Pearl White',
        insurance: {
            provider: 'Sri Lanka Insurance',
            policyNumber: 'POL123456',
            expiryDate: '2025-06-01'
        },
        emissionTestExpiry: '2025-03-01',
        roadTaxExpiry: '2025-12-31',
        registrationCertificate: 'REG123456'
    },
    {
        id: '2',
        name: 'Toyota Prius',
        model: 'Prius',
        type: 'Sedan',
        status: 'Booked',
        imageUrl: 'https://images.unsplash.com/photo-1564046043783-1c2e38c1e567',
        features: ['Hybrid', 'Fuel Efficient', 'Eco Mode'],
        capacity: 5,
        fuelType: 'Hybrid',
        licensePlate: 'PRS-2022',
        lastMaintenance: '2024-02-10',
        maintenanceLogs: [
            {
                id: '2',
                date: '2024-02-10',
                type: 'Regular Service',
                description: 'Regular maintenance and oil change',
                nextDueDate: '2024-08-10',
                cost: 300
            }
        ],
        vin: 'JTDKN3DU1E0123456',
        brand: 'Toyota',
        yearOfManufacture: 2022,
        engineCapacity: '1.8L Hybrid',
        chassisNumber: 'CH54321',
        color: 'Silver',
        insurance: {
            provider: 'Ceylon Insurance',
            policyNumber: 'POL789012',
            expiryDate: '2025-04-15'
        },
        emissionTestExpiry: '2025-02-15',
        roadTaxExpiry: '2025-12-31',
        registrationCertificate: 'REG789012'
    },
    {
        id: '3',
        name: 'Honda CR-V',
        model: 'CR-V',
        type: 'SUV',
        status: 'Maintenance',
        imageUrl: 'https://images.unsplash.com/photo-1596022990509-ea01b5d7baaf',
        features: ['AWD', 'Spacious', 'Safety Features'],
        capacity: 7,
        fuelType: 'Petrol',
        licensePlate: 'CRV-2021',
        lastMaintenance: '2024-03-05',
        maintenanceLogs: [
            {
                id: '3',
                date: '2024-03-05',
                type: 'Part Replacement',
                description: 'Brake pad replacement',
                nextDueDate: '2024-09-05',
                cost: 800
            }
        ],
        vin: '2HKRM4H57CH123456',
        brand: 'Honda',
        yearOfManufacture: 2021,
        engineCapacity: '1.5L Turbo',
        chassisNumber: 'CH67890',
        color: 'Red',
        insurance: {
            provider: 'HNB General Insurance',
            policyNumber: 'POL345678',
            expiryDate: '2025-05-20'
        },
        emissionTestExpiry: '2025-01-20',
        roadTaxExpiry: '2025-12-31',
        registrationCertificate: 'REG345678'
    }
];

export const mockDrivers: Driver[] = [
    //   {
    //     id: 'DRV001',
    //     fullName: 'Kamal Perera',
    //     nic: '199012345678',
    //     address: '123 Galle Road, Colombo 03',
    //     phoneNumber: '+94771234567',
    //     email: 'kamal.perera@example.com',
    //     dateOfBirth: '1990-05-15',
    //     licenseNumber: 'LIC123456',
    //     licenseClass: 'B1',
    //     licenseIssueDate: '2010-06-01',
    //     licenseExpiryDate: '2030-06-01',
    //     bloodGroup: 'O+',
    //     emergencyContact: {
    //       name: 'Sumithra Perera',
    //       relationship: 'Wife',
    //       phoneNumber: '+94712345678'
    //     },
    //     medicalCertificateExpiry: '2025-03-15',
    //     profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    //     status: 'Available',
    //     experience: '5 years',
    //     rating: 4.8,
    //     completedTrips: 1250,
    //     joinedDate: '2019-01-15',
    //     currentVehicle: 'TSL-2023'
    //   },
    //   {
    //     id: 'DRV002',
    //     fullName: 'Nimal Silva',
    //     nic: '198506789012',
    //     address: '456 Kandy Road, Kadawatha',
    //     phoneNumber: '+94782345678',
    //     email: 'nimal.silva@example.com',
    //     dateOfBirth: '1985-08-22',
    //     licenseNumber: 'LIC789012',
    //     licenseClass: 'B1',
    //     licenseIssueDate: '2005-09-15',
    //     licenseExpiryDate: '2025-09-15',
    //     bloodGroup: 'A+',
    //     emergencyContact: {
    //       name: 'Chamila Silva',
    //       relationship: 'Wife',
    //       phoneNumber: '+94723456789'
    //     },
    //     medicalCertificateExpiry: '2025-01-20',
    //     profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    //     status: 'On Trip',
    //     experience: '10 years',
    //     rating: 4.9,
    //     completedTrips: 2100,
    //     joinedDate: '2015-03-10',
    //     currentVehicle: 'PRS-2022'
    //   },
    //   {
    //     id: 'DRV003',
    //     fullName: 'Sunil Fernando',
    //     nic: '197803456789',
    //     address: '789 Negombo Road, Ja-Ela',
    //     phoneNumber: '+94793456789',
    //     email: 'sunil.fernando@example.com',
    //     dateOfBirth: '1978-12-10',
    //     licenseNumber: 'LIC345678',
    //     licenseClass: 'B1',
    //     licenseIssueDate: '2000-01-20',
    //     licenseExpiryDate: '2030-01-20',
    //     bloodGroup: 'B+',
    //     emergencyContact: {
    //       name: 'Malini Fernando',
    //       relationship: 'Wife',
    //       phoneNumber: '+94734567890'
    //     },
    //     medicalCertificateExpiry: '2024-12-30',
    //     profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    //     status: 'Available',
    //     experience: '15 years',
    //     rating: 4.7,
    //     completedTrips: 3200,
    //     joinedDate: '2010-07-25',
    //     currentVehicle: null
    //   }
];
