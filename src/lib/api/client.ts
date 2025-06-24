/**
 * API client configuration and utilities
 */

import { config } from '@/lib/config';

// API Response Types
export interface ApiResponse<T = any> {
    data: T;
    success: boolean;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// API Error Class
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public errors?: string[]
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// HTTP Client Configuration
const createApiClient = () => {
    const baseURL = config.api.BASE_URL;
    const timeout = config.api.TIMEOUT;

    return {
        get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
            // Implementation for GET requests
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            return response.json();
        },

        post: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
            // Implementation for POST requests
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            return response.json();
        },

        put: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
            // Implementation for PUT requests
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            return response.json();
        },

        delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
            // Implementation for DELETE requests
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            return response.json();
        },
    };
};

export const apiClient = createApiClient();
