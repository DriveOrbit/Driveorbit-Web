/**
 * Driver service - handles all driver-related API calls
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api/client';
import { Driver, driverSchema, SearchFilters } from '@/lib/validations/schemas';

export const driverService = {
    // Get all drivers with optional filtering
    getDrivers: async (filters?: SearchFilters): Promise<PaginatedResponse<Driver[]>> => {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = `/drivers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiClient.get<Driver[]>(endpoint) as Promise<PaginatedResponse<Driver[]>>;
    },

    // Get single driver by ID
    getDriver: async (id: string): Promise<ApiResponse<Driver>> => {
        return apiClient.get<Driver>(`/drivers/${id}`);
    },

    // Create new driver
    createDriver: async (driver: Omit<Driver, 'id'>): Promise<ApiResponse<Driver>> => {
        const validatedData = driverSchema.omit({ id: true }).parse(driver);
        return apiClient.post<Driver>('/drivers', validatedData);
    },

    // Update existing driver
    updateDriver: async (id: string, driver: Partial<Driver>): Promise<ApiResponse<Driver>> => {
        const validatedData = driverSchema.partial().parse(driver);
        return apiClient.put<Driver>(`/drivers/${id}`, validatedData);
    },

    // Delete driver
    deleteDriver: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/drivers/${id}`);
    },

    // Get drivers by status
    getDriversByStatus: async (status: Driver['status']): Promise<ApiResponse<Driver[]>> => {
        return apiClient.get<Driver[]>(`/drivers?status=${status}`);
    },

    // Update driver status
    updateDriverStatus: async (id: string, status: Driver['status']): Promise<ApiResponse<Driver>> => {
        return apiClient.put<Driver>(`/drivers/${id}/status`, { status });
    },

    // Search drivers by name or ID
    searchDrivers: async (query: string): Promise<ApiResponse<Driver[]>> => {
        return apiClient.get<Driver[]>(`/drivers/search?q=${encodeURIComponent(query)}`);
    },

    // Get driver's assigned vehicle
    getDriverVehicle: async (id: string): Promise<ApiResponse<any>> => {
        return apiClient.get<any>(`/drivers/${id}/vehicle`);
    },

    // Assign vehicle to driver
    assignVehicle: async (driverId: string, vehicleId: string): Promise<ApiResponse<void>> => {
        return apiClient.put<void>(`/drivers/${driverId}/vehicle`, { vehicleId });
    },

    // Unassign vehicle from driver
    unassignVehicle: async (driverId: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/drivers/${driverId}/vehicle`);
    },
};

export type DriverService = typeof driverService;
