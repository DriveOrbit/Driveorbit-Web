import { Driver } from '@/lib/types/driver';
import Image from 'next/image';

interface DriverCardProps {
  driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={driver.photoUrl}
            alt={driver.fullName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{driver.fullName}</h2>
          <p className="text-sm text-muted-foreground">NIC: {driver.nic}</p>
          <p className="text-sm text-muted-foreground">{driver.address}</p>
        </div>
      </div>
    </div>
  );
}