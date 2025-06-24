import { z } from 'zod';

// Vehicle Schema
export const vehicleSchema = z.object({
    id: z.string().min(1, 'Vehicle ID is required'),
    name: z.string().min(1, 'Vehicle name is required'),
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    type: z.enum(['Car', 'Van', 'Truck', 'Bus', 'Motorcycle']),
    status: z.enum(['Available', 'In Use', 'Maintenance', 'Out of Service']),
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
    licensePlate: z.string().min(1, 'License plate is required'),
    capacity: z.number().positive('Capacity must be positive'),
    mileage: z.number().min(0, 'Mileage cannot be negative'),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

// Driver Schema
export const driverSchema = z.object({
    id: z.string().min(1, 'Driver ID is required'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    licenseNumber: z.string().min(1, 'License number is required'),
    licenseExpiry: z.string().refine((date) => new Date(date) > new Date(), {
        message: 'License expiry date must be in the future',
    }),
    status: z.enum(['Active', 'On Break', 'Off Duty', 'Unavailable']),
    experienceYears: z.number().min(0, 'Experience cannot be negative'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    emergencyContact: z.object({
        name: z.string().min(2, 'Emergency contact name is required'),
        phone: z.string().min(10, 'Emergency contact phone is required'),
        relationship: z.string().min(1, 'Relationship is required'),
    }),
});

export type Driver = z.infer<typeof driverSchema>;

// Maintenance Log Schema
export const maintenanceLogSchema = z.object({
    id: z.string().min(1, 'Maintenance ID is required'),
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
    type: z.enum(['Routine', 'Repair', 'Inspection', 'Emergency']),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    cost: z.number().min(0, 'Cost cannot be negative'),
    mechanic: z.string().min(1, 'Mechanic name is required'),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Cancelled']),
    parts: z.array(z.object({
        name: z.string().min(1, 'Part name is required'),
        cost: z.number().min(0, 'Part cost cannot be negative'),
        quantity: z.number().positive('Quantity must be positive'),
    })).optional(),
    nextServiceDate: z.string().optional(),
});

export type MaintenanceLog = z.infer<typeof maintenanceLogSchema>;

// Notification Schema
export const notificationSchema = z.object({
    id: z.string().min(1, 'Notification ID is required'),
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    type: z.enum(['info', 'success', 'warning', 'error']),
    isRead: z.boolean().default(false),
    createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    userId: z.string().optional(),
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

// Search Filters Schema
export const searchFiltersSchema = z.object({
    query: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    page: z.number().positive().default(1),
    limit: z.number().positive().max(100).default(10),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;

// Dashboard Stats Schema
export const dashboardStatsSchema = z.object({
    totalVehicles: z.number().min(0),
    availableVehicles: z.number().min(0),
    inUseVehicles: z.number().min(0),
    maintenanceVehicles: z.number().min(0),
    totalDrivers: z.number().min(0),
    activeDrivers: z.number().min(0),
    totalTrips: z.number().min(0),
    totalDistance: z.number().min(0),
    fuelConsumption: z.number().min(0),
    lastUpdated: z.string(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
