// components/ui/notification-item.tsx
import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
  };
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: FC<NotificationItemProps> = ({ 
  notification, 
  onRead, 
  onDelete 
}) => {
  const typeClasses = {
    info: 'border-l-4 border-blue-500',
    warning: 'border-l-4 border-yellow-500',
    error: 'border-l-4 border-red-500',
    success: 'border-l-4 border-green-500'
  };
  
  return (
    <div 
      className={`p-3 border-b border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer ${
        notification.isRead ? 'opacity-70' : 'bg-primary/5'
      } ${typeClasses[notification.type]}`}
      onClick={() => onRead(notification.id)}
    >
      <div className="flex justify-between">
        <h4 className="font-medium">{notification.title}</h4>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Delete notification"
        >
          &times;
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
      <p className="text-xs text-gray-400 mt-1">
        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
      </p>
    </div>
  );
};
