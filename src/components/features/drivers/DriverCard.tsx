
import { Driver } from '@/features/drivers/types/driver';
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
                    <h2 className="text-xl font-semibold text-foreground">{driver.fullName}<span className="text-sm text-muted-foreground">(ID: {driver.id})</span></h2>
                    <p className="text-sm text-muted-foreground">NIC: {driver.nic}</p>
                    <p className="text-sm text-muted-foreground">Phone: {driver.phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">Email: {driver.email}</p>
                    <p className="text-sm text-muted-foreground">License: {driver.licenseNumber}</p>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Address:</span> {driver.address}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Emergency Contact:</span> {driver.emergencyContactName} ({driver.emergencyContactRelation}) - {driver.emergencyContact}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">License Type:</span> {driver.licenseType}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">License Issue Date:</span> {driver.licenseIssueDate}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium">License Expire Date:</span> {driver.licenseExpireDate}
                </p>
            </div>
        </div>
    );
}