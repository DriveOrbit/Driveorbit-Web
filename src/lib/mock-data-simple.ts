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
    {
        id: 'DRV001',
        fullName: 'Kamal Perera',
        nic: '199012345678',
        address: '123 Galle Road, Colombo 03',
        phoneNumber: '+94771234567',
        email: 'kamal.perera@example.com',
        dateOfBirth: '1990-05-15',
        licenseNumber: 'LIC123456',
        licenseType: 'B1',
        licenseIssueDate: '2010-06-01',
        licenseExpireDate: '2030-06-01',
        emergencyContact: '+94712345678',
        emergencyContactName: 'Sumithra Perera',
        emergencyContactRelation: 'Wife',
        password: 'hashed_password_123',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    {
        id: 'DRV002',
        fullName: 'Nimal Silva',
        nic: '198506789012',
        address: '456 Kandy Road, Kadawatha',
        phoneNumber: '+94782345678',
        email: 'nimal.silva@example.com',
        dateOfBirth: '1985-08-22',
        licenseNumber: 'LIC789012',
        licenseType: 'B1',
        licenseIssueDate: '2005-09-15',
        licenseExpireDate: '2025-09-15',
        emergencyContact: '+94723456789',
        emergencyContactName: 'Chamila Silva',
        emergencyContactRelation: 'Wife',
        password: 'hashed_password_456',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    {
        id: 'DRV003',
        fullName: 'Sunil Fernando',
        nic: '197803456789',
        address: '789 Negombo Road, Ja-Ela',
        phoneNumber: '+94793456789',
        email: 'sunil.fernando@example.com',
        dateOfBirth: '1978-12-10',
        licenseNumber: 'LIC345678',
        licenseType: 'B1',
        licenseIssueDate: '2000-01-20',
        licenseExpireDate: '2030-01-20',
        emergencyContact: '+94734567890',
        emergencyContactName: 'Malini Fernando',
        emergencyContactRelation: 'Wife',
        password: 'hashed_password_789',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
    }
];
