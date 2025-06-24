/**
 * Application configuration
 */

import { MAPS_CONFIG, API_CONFIG } from '@/lib/constants';

export const config = {
    // Application
    app: {
        name: 'DriveOrbit',
        version: '1.0.0',
        description: 'Fleet Management System',
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },

    // API
    api: API_CONFIG,

    // Google Maps
    maps: MAPS_CONFIG,

    // Database (when you add backend)
    database: {
        url: process.env.DATABASE_URL,
        maxConnections: 10,
    },

    // Authentication (when you add auth)
    auth: {
        secret: process.env.AUTH_SECRET,
        expiresIn: '7d',
    },

    // Feature Flags
    features: {
        enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        enableNotifications: true,
        enableRealTimeTracking: true,
        enableMaintenanceAlerts: true,
    },

    // Environment
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
} as const;

export type Config = typeof config;
