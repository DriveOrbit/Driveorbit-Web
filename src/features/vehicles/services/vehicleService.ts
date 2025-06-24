/**
 * Vehicle service - handles all vehicle-related API calls
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api/client';
import { Vehicle, vehicleSchema, SearchFilters } from '@/lib/validations/schemas';

export const vehicleService = {  // Get all vehicles with optional filtering
    getVehicles: async (filters?: SearchFilters): Promise<PaginatedResponse<Vehicle[]>> => {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = `/vehicles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        // Cast to PaginatedResponse since we expect pagination metadata from the API
        return apiClient.get<Vehicle[]>(endpoint) as Promise<PaginatedResponse<Vehicle[]>>;
    },

    // Get single vehicle by ID
    getVehicle: async (id: string): Promise<ApiResponse<Vehicle>> => {
        return apiClient.get<Vehicle>(`/vehicles/${id}`);
    },

    // Create new vehicle
    createVehicle: async (vehicle: Omit<Vehicle, 'id'>): Promise<ApiResponse<Vehicle>> => {
        // Validate data before sending
        const validatedData = vehicleSchema.omit({ id: true }).parse(vehicle);
        return apiClient.post<Vehicle>('/vehicles', validatedData);
    },

    // Update existing vehicle
    updateVehicle: async (id: string, vehicle: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> => {
        // Validate data before sending
        const validatedData = vehicleSchema.partial().parse(vehicle);
        return apiClient.put<Vehicle>(`/vehicles/${id}`, validatedData);
    },

    // Delete vehicle
    deleteVehicle: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/vehicles/${id}`);
    },

    // Get vehicles by status
    getVehiclesByStatus: async (status: Vehicle['status']): Promise<ApiResponse<Vehicle[]>> => {
        return apiClient.get<Vehicle[]>(`/vehicles?status=${status}`);
    },

    // Update vehicle status
    updateVehicleStatus: async (id: string, status: Vehicle['status']): Promise<ApiResponse<Vehicle>> => {
        return apiClient.put<Vehicle>(`/vehicles/${id}/status`, { status });
    },

    // Get vehicle location
    getVehicleLocation: async (id: string): Promise<ApiResponse<{ lat: number; lng: number }>> => {
        return apiClient.get<{ lat: number; lng: number }>(`/vehicles/${id}/location`);
    },

    // Update vehicle location
    updateVehicleLocation: async (
        id: string,
        location: { lat: number; lng: number }
    ): Promise<ApiResponse<void>> => {
        return apiClient.put<void>(`/vehicles/${id}/location`, location);
    },

    // Get vehicle maintenance history
    getVehicleMaintenanceHistory: async (id: string): Promise<ApiResponse<any[]>> => {
        return apiClient.get<any[]>(`/vehicles/${id}/maintenance`);
    },
};

export type VehicleService = typeof vehicleService;
