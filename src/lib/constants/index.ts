/**
 * Application-wide constants for DriveOrbit Fleet Management System
 */

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
} as const;

// Google Maps Configuration
export const MAPS_CONFIG = {
    API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    DEFAULT_CENTER: {
        lat: 6.9271,
        lng: 79.8612, // Colombo, Sri Lanka
    },
    DEFAULT_ZOOM: 13,
    MAP_ID: 'DRIVEORBIT_MAP',
} as const;

// Application Routes
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    VEHICLES: '/vehicles',
    DRIVERS: '/drivers',
    MAINTENANCE: '/maintenance',
    NOTIFICATIONS: '/notifications',
    SETTINGS: '/settings',
    PROFILE: '/profile',
} as const;

// Vehicle Status
export const VEHICLE_STATUS = {
    AVAILABLE: 'Available',
    IN_USE: 'In Use',
    MAINTENANCE: 'Maintenance',
    OUT_OF_SERVICE: 'Out of Service',
} as const;

// Driver Status
export const DRIVER_STATUS = {
    ACTIVE: 'Active',
    ON_BREAK: 'On Break',
    OFF_DUTY: 'Off Duty',
    UNAVAILABLE: 'Unavailable',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
} as const;

// Maintenance Types
export const MAINTENANCE_TYPES = {
    ROUTINE: 'Routine',
    REPAIR: 'Repair',
    INSPECTION: 'Inspection',
    EMERGENCY: 'Emergency',
} as const;

// Time Intervals (in milliseconds)
export const INTERVALS = {
    VEHICLE_UPDATE: 5000, // 5 seconds
    NOTIFICATION_CHECK: 30000, // 30 seconds
    HEARTBEAT: 60000, // 1 minute
} as const;

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
} as const;
