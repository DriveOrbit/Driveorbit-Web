/**
 * Custom hooks for driver management
 */

import { useState, useEffect } from 'react';
import { driverService } from '../services/driverService';
import { Driver, SearchFilters } from '@/lib/validations/schemas';
import { toast } from 'react-toastify';

// Hook for managing drivers list
export const useDrivers = (filters?: SearchFilters) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await driverService.getDrivers(filters);
            setDrivers(response.data);
            setPagination(response.pagination);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch drivers';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, [JSON.stringify(filters)]);

    return {
        drivers,
        loading,
        error,
        pagination,
        refetch: fetchDrivers,
    };
};

// Hook for managing single driver
export const useDriver = (id: string | null) => {
    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDriver = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await driverService.getDriver(id);
            setDriver(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch driver';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriver();
    }, [id]);

    return {
        driver,
        loading,
        error,
        refetch: fetchDriver,
    };
};

// Hook for driver operations (create, update, delete)
export const useDriverOperations = () => {
    const [loading, setLoading] = useState(false);

    const createDriver = async (driver: Omit<Driver, 'id'>) => {
        try {
            setLoading(true);
            const response = await driverService.createDriver(driver);
            toast.success('Driver registered successfully');
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to register driver';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateDriver = async (id: string, driver: Partial<Driver>) => {
        try {
            setLoading(true);
            const response = await driverService.updateDriver(id, driver);
            toast.success('Driver updated successfully');
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update driver';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteDriver = async (id: string) => {
        try {
            setLoading(true);
            await driverService.deleteDriver(id);
            toast.success('Driver removed successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove driver';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateDriverStatus = async (id: string, status: Driver['status']) => {
        try {
            setLoading(true);
            const response = await driverService.updateDriverStatus(id, status);
            toast.success(`Driver status updated to ${status}`);
            return response.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update driver status';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createDriver,
        updateDriver,
        deleteDriver,
        updateDriverStatus,
        loading,
    };
};

// Hook for driver search
export const useDriverSearch = () => {
    const [results, setResults] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchDrivers = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await driverService.searchDrivers(query);
            setResults(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Search failed';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => {
        setResults([]);
        setError(null);
    };

    return {
        results,
        loading,
        error,
        searchDrivers,
        clearResults,
    };
};

// Hook for driver-vehicle assignment
export const useDriverVehicleAssignment = () => {
    const [loading, setLoading] = useState(false);

    const assignVehicle = async (driverId: string, vehicleId: string) => {
        try {
            setLoading(true);
            await driverService.assignVehicle(driverId, vehicleId);
            toast.success('Vehicle assigned to driver successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to assign vehicle';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const unassignVehicle = async (driverId: string) => {
        try {
            setLoading(true);
            await driverService.unassignVehicle(driverId);
            toast.success('Vehicle unassigned from driver successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to unassign vehicle';
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        assignVehicle,
        unassignVehicle,
        loading,
    };
};

// Hook for drivers by status
export const useDriversByStatus = (status: Driver['status']) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDriversByStatus = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await driverService.getDriversByStatus(status);
            setDrivers(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch drivers';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriversByStatus();
    }, [status]);

    return {
        drivers,
        loading,
        error,
        refetch: fetchDriversByStatus,
    };
};
