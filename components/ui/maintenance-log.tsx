'use client';

import type { MaintenanceLog } from '@/types/fleet';
import { Card } from './card';
import { Calendar, PenTool as Tool, AlertCircle } from 'lucide-react';
import { format, isPast } from 'date-fns';

interface MaintenanceLogProps {
  log: MaintenanceLog;
}

export function MaintenanceLog({ log }: MaintenanceLogProps) {
  const isOverdue = isPast(new Date(log.nextDueDate));

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Tool className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{log.type}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
        </div>
        {isOverdue && (
          <AlertCircle className="h-5 w-5 text-destructive" />
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Service Date: {format(new Date(log.date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className={isOverdue ? 'text-destructive' : ''}>
            Next Due: {format(new Date(log.nextDueDate), 'MMM d, yyyy')}
          </span>
        </div>
      </div>

      {log.partDetails && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium">Part Details</h4>
          <div className="mt-2 text-sm text-muted-foreground">
            <p>Name: {log.partDetails.name}</p>
            {log.partDetails.serialNumber && (
              <p>Serial: {log.partDetails.serialNumber}</p>
            )}
            {log.partDetails.warranty && (
              <p>Warranty: {log.partDetails.warranty}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}