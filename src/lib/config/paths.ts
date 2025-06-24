/**
 * Path mapping configuration for clean imports
 * Add this to your tsconfig.json under compilerOptions.paths
 */

export const pathMappings = {
    // Features
    "@/features/*": ["src/features/*"],
    "@/features/vehicles": ["src/features/vehicles/index.ts"],
    "@/features/drivers": ["src/features/drivers/index.ts"],
    "@/features/maps": ["src/features/maps/index.ts"],
    "@/features/dashboard": ["src/features/dashboard/index.ts"],
    "@/features/maintenance": ["src/features/maintenance/index.ts"],
    "@/features/notifications": ["src/features/notifications/index.ts"],

    // Components
    "@/components/*": ["src/components/*"],
    "@/components/ui/*": ["src/components/ui/*"],
    "@/components/features/*": ["src/components/features/*"],
    "@/components/common/*": ["src/components/common/*"],
    "@/components/layout/*": ["src/components/layout/*"],

    // Lib
    "@/lib/*": ["src/lib/*"],
    "@/lib/utils": ["src/lib/utils.ts"],
    "@/lib/constants": ["src/lib/constants/index.ts"],
    "@/lib/config": ["src/lib/config/index.ts"],
    "@/lib/validations": ["src/lib/validations/schemas.ts"],
    "@/lib/api": ["src/lib/api/client.ts"],

    // App
    "@/app/*": ["src/app/*"],
};

/**
 * Example usage:
 * 
 * // ✅ Feature imports
 * import { useVehicles, vehicleService } from '@/features/vehicles';
 * import { useDrivers, driverService } from '@/features/drivers';
 * 
 * // ✅ Component imports  
 * import { Button } from '@/components/ui/button';
 * import { VehicleCard } from '@/components/features/vehicles/VehicleCard';
 * 
 * // ✅ Lib imports
 * import { cn } from '@/lib/utils';
 * import { config } from '@/lib/config';
 * import { vehicleSchema } from '@/lib/validations';
 */
