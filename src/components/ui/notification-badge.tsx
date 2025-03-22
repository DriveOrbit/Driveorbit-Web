// components/ui/notification-badge.tsx
import { FC } from 'react';

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge: FC<NotificationBadgeProps> = ({ count }) => {
  if (count <= 0) return null;
  
  return (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  );
};
