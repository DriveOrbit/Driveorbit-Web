/**
 * Custom hooks for vehicle management
 */

import { useState, useEffect } from 'react';
import { vehicleService } from '../services/vehicleService';
import { Vehicle, SearchFilters } from '@/lib/validations/schemas';
import { toast } from 'react-toastify';

// Hook for managing vehicles list
export const useVehicles = (filters?: SearchFilters) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await vehicleService.getVehicles(filters);
            setVehicles(response.data);
            setPagination(response.pagination);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicles';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, [JSON.stringify(filters)]);

    return {
        vehicles,
        loading,
        error,
        pagination,
        refetch: fetchVehicles,
    };
};

// Hook for managing single vehicle
export const useVehicle = (id: string | null) => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicle = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await vehicleService.getVehicle(id);
            setVehicle(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicle';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicle();
    }, [id]);

    return {
        vehicle,
        loading,
        error,
        refetch: fetchVehicle,
    };
};

// Hook for vehicle operations (create, update, delete)
export const useVehicleOperations = () => {
    const [loading, setLoading] = useState(false);

    const createVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
        try {
            setLoading(true);
            const response = await vehicleService.createVehicle(vehicle);
            toast.success('Vehicle created successfully');
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create vehicle';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateVehicle = async (id: string, vehicle: Partial<Vehicle>) => {
        try {
            setLoading(true);
            const response = await vehicleService.updateVehicle(id, vehicle);
            toast.success('Vehicle updated successfully');
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update vehicle';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteVehicle = async (id: string) => {
        try {
            setLoading(true);
            await vehicleService.deleteVehicle(id);
            toast.success('Vehicle deleted successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete vehicle';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateVehicleStatus = async (id: string, status: Vehicle['status']) => {
        try {
            setLoading(true);
            const response = await vehicleService.updateVehicleStatus(id, status);
            toast.success(`Vehicle status updated to ${status}`);
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update vehicle status';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createVehicle,
        updateVehicle,
        deleteVehicle,
        updateVehicleStatus,
        loading,
    };
};

// Hook for vehicle status filtering
export const useVehiclesByStatus = (status: Vehicle['status']) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVehiclesByStatus = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await vehicleService.getVehiclesByStatus(status);
            setVehicles(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicles';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehiclesByStatus();
    }, [status]);

    return {
        vehicles,
        loading,
        error,
        refetch: fetchVehiclesByStatus,
    };
};

// Hook for real-time vehicle locations
export const useVehicleLocations = (refreshInterval: number = 5000) => {
    const [locations, setLocations] = useState<Record<string, { lat: number; lng: number }>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // This would fetch from your real-time API
                // For now, we'll use mock data
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch vehicle locations:', err);
                setLoading(false);
            }
        };

        fetchLocations();
        const interval = setInterval(fetchLocations, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    const updateVehicleLocation = (vehicleId: string, location: { lat: number; lng: number }) => {
        setLocations(prev => ({
            ...prev,
            [vehicleId]: location,
        }));
    };

    return {
        locations,
        loading,
        updateVehicleLocation,
    };
};
