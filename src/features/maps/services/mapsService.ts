/**
 * Maps service - handles map-related functionality and location tracking
 */

import { apiClient, ApiResponse } from '@/lib/api/client';
import { config } from '@/lib/config';

export interface MapLocation {
    lat: number;
    lng: number;
}

export interface VehicleLocation extends MapLocation {
    vehicleId: string;
    timestamp: string;
    speed?: number;
    heading?: number;
}

export interface RouteRequest {
    origin: MapLocation;
    destination: MapLocation;
    waypoints?: MapLocation[];
    optimizeWaypoints?: boolean;
}

export interface RouteResponse {
    distance: string;
    duration: string;
    routes: google.maps.DirectionsRoute[];
}

export const mapsService = {
    // Get real-time locations of all vehicles
    getAllVehicleLocations: async (): Promise<ApiResponse<VehicleLocation[]>> => {
        return apiClient.get<VehicleLocation[]>('/vehicles/locations');
    },

    // Get location of specific vehicle
    getVehicleLocation: async (vehicleId: string): Promise<ApiResponse<VehicleLocation>> => {
        return apiClient.get<VehicleLocation>(`/vehicles/${vehicleId}/location`);
    },

    // Update vehicle location
    updateVehicleLocation: async (
        vehicleId: string,
        location: MapLocation
    ): Promise<ApiResponse<void>> => {
        return apiClient.put<void>(`/vehicles/${vehicleId}/location`, {
            ...location,
            timestamp: new Date().toISOString(),
        });
    },

    // Get route between two points
    getRoute: async (request: RouteRequest): Promise<RouteResponse> => {
        // This would typically use Google Directions API
        // For now, we'll create a mock implementation
        const { origin, destination } = request;

        // Calculate approximate distance (haversine formula)
        const R = 6371; // Earth's radius in km
        const dLat = (destination.lat - origin.lat) * Math.PI / 180;
        const dLng = (destination.lng - origin.lng) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return {
            distance: `${distance.toFixed(1)} km`,
            duration: `${Math.round(distance * 2)} min`, // Rough estimate
            routes: [], // Would be populated by actual Google Directions API
        };
    },

    // Geocode address to coordinates
    geocodeAddress: async (address: string): Promise<MapLocation | null> => {
        try {
            if (!config.maps.API_KEY) {
                throw new Error('Google Maps API key not configured');
            }

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${config.maps.API_KEY}`
            );

            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lng: location.lng,
                };
            }

            return null;
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    },

    // Reverse geocode coordinates to address
    reverseGeocode: async (location: MapLocation): Promise<string | null> => {
        try {
            if (!config.maps.API_KEY) {
                throw new Error('Google Maps API key not configured');
            }

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${config.maps.API_KEY}`
            );

            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                return data.results[0].formatted_address;
            }

            return null;
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            return null;
        }
    },

    // Get nearby places (gas stations, repair shops, etc.)
    getNearbyPlaces: async (
        location: MapLocation,
        type: string,
        radius: number = 5000
    ): Promise<any[]> => {
        try {
            if (!config.maps.API_KEY) {
                throw new Error('Google Maps API key not configured');
            }

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${config.maps.API_KEY}`
            );

            const data = await response.json();

            if (data.status === 'OK') {
                return data.results;
            }

            return [];
        } catch (error) {
            console.error('Nearby places error:', error);
            return [];
        }
    },

    // Track vehicle path over time
    getVehiclePath: async (
        vehicleId: string,
        startTime: string,
        endTime: string
    ): Promise<ApiResponse<VehicleLocation[]>> => {
        return apiClient.get<VehicleLocation[]>(
            `/vehicles/${vehicleId}/path?start=${startTime}&end=${endTime}`
        );
    },
};

export type MapsService = typeof mapsService;
